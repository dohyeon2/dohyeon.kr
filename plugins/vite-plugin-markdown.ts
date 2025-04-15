// vite-plugin-markdown.ts

import { Plugin } from "vite";
import { readFileSync } from "fs";
import { marked } from "marked"; // marked 라이브러리 사용 (직접 구현 시 설치 필요)

export default function markdownPlugin(): Plugin {
    return {
        name: "vite-plugin-markdown",
        transform(code, id) {
            // .md 파일만 처리
            if (!id.endsWith(".md")) {
                return null;
            }

            // 마크다운 파일 읽기
            const content = code || readFileSync(id, "utf-8");

            // marked로 HTML로 변환
            const html = marked.parse(content);

            // 메타데이터 추출 (필요한 경우)
            const metadata = extractMetadata(content);

            // ESM 모듈로 변환
            const output = `
        export const html = ${JSON.stringify(html)};
        export const raw = ${JSON.stringify(content)};
        export const metadata = ${JSON.stringify(metadata)};
        export  { html, raw, metadata };
      `;

            return {
                code: output,
                map: null, // 소스맵은 필요한 경우 추가
            };
        },
    };
}

// 메타데이터 추출 함수 (필요한 경우)
function extractMetadata(content: string) {
    // 여기서는 간단한 예시만 구현
    // 실제로는 Front Matter 파싱 등이 필요할 수 있음
    const title = content.match(/^#\s+(.*)$/m)?.[1] || "";
    return { title };
}
