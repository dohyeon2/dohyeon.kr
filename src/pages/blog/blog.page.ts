import { routes } from "@blog/contents";
import { Router } from "@lit-labs/router";
import "giscus";
import mdStyle from "github-markdown-css/github-markdown-light.css?inline";
import { css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import "./components/post-navigation";

@customElement("blog-page")
export default class BlogPage extends TailwindElement {
    connectedCallback(): void {
        super.connectedCallback();
        console.log(routes);
    }

    private router = new Router(this, [
        { ...routes[0], path: "" },
        { ...routes[0], path: "/" },
        ...routes,
    ]);

    render() {
        return html`<div
            class="mx-auto max-w-[1200px] w-full flex flex-col gap-4 p-5"
        >
            <h1 class="text-2xl font-bold">Blog</h1>
            <div class="flex gap-10">
                <div class="flex flex-col gap-2">
                    ${routes.map((route) => {
                        return html`<post-navigation
                            .path=${route.path.replace(/^\//, "")}
                        ></post-navigation>`;
                    })}
                </div>
                <div role="article" class="markdown-body flex-1">
                    ${this.router.outlet()}
                </div>
            </div>
        </div>`;
    }

    static get styles() {
        return [
            super.styles,
            css`
                ${unsafeCSS(mdStyle)}
            `,
        ];
    }
}
