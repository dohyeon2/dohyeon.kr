/// <reference types="vite/client" />

declare module "*.md" {
    const html: string;
    const raw: string;
    const meta: {
        title: string;
    };
    export { html, raw, meta };
}
