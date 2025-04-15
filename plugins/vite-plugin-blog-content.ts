import { readdirSync, readFileSync, statSync } from "fs";
import { marked } from "marked";
import { join } from "path";
import { cwd } from "process";
import { Plugin } from "vite";

export default function blogContentPlugin({ path }: { path: string }): Plugin {
    const virtualModuleId = "@blog/contents";
    const resolvedId = `\0${virtualModuleId}`;
    return {
        name: "vite-plugin-blog-content",
        configResolved(config) {
            // Vite 설정이 확정된 후 호출
            const { logger } = config;
            logger.info("블로그 콘텐츠 플러그인 초기화됨", { timestamp: true });
            logger.info(`대상 경로: ${join(cwd(), path)}`, { timestamp: true });
            const files = readDirRecursive(join(cwd(), path));
        },

        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedId;
            }
            return null;
        },

        async load(id) {
            if (id !== resolvedId) {
                return null;
            }

            const files = readDirRecursive(join(cwd(), path));

            const htmlMap = await Promise.all(
                files.map(async (file) => {
                    // 마크다운 파일 읽기
                    const content = readFileSync(file, "utf-8");
                    const updatedAt = statSync(file).mtime;

                    // marked로 HTML로 변환
                    const html = await marked.parse(content);
                    return [file, html, updatedAt] as [string, string, Date];
                })
            );

            return {
                code: `
                import { html } from "lit";
                import { Router } from "@lit-labs/router";
                export const routes = [
                    ${htmlMap
                        .sort((a, b) => b[2].getTime() - a[2].getTime())
                        .map(([file, html]) => {
                            return `{ path: "${file
                                .replace(new RegExp(`${cwd()}${path}`), "")
                                .replace(
                                    ".md",
                                    ""
                                )}", render: () => html\`${html}\` }`;
                        })
                        .join(",")}];`,
                map: null, // 소스맵은 필요한 경우 추가
            };
        },
    };
}

// 재귀적으로 디렉토리 내 모든 파일 탐색
function readDirRecursive(directory: string): string[] {
    const files: string[] = [];

    // 주어진 디렉토리의 모든 항목 읽기
    const dirEntries = readdirSync(directory, { withFileTypes: true });

    for (const entry of dirEntries) {
        const fullPath = join(directory, entry.name);

        if (entry.isDirectory()) {
            // 디렉토리인 경우 재귀 호출 후 결과 병합
            const subDirFiles = readDirRecursive(fullPath);
            files.push(...subDirFiles);
        } else {
            // 파일인 경우 목록에 추가
            files.push(fullPath);
        }
    }

    return files;
}
