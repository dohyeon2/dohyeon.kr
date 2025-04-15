/// <reference types="vite/client" />

declare module "*.md" {
    const html: string;
    const raw: string;
    const meta: {
        title: string;
    };
    export { html, raw, meta };
}

declare module "@blog/contents" {
    const routes: {
        path: string;
        render: () => string;
    }[];
    export { routes };
}
