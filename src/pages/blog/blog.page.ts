import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "giscus";
import mdStyle from "github-markdown-css/github-markdown-light.css?inline";
import { html as content } from "./contents/안녕하세요.md";

@customElement("blog-page")
export default class BlogPage extends LitElement {
    constructor() {
        super();
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    render() {
        return html`<div>
            <h1>Blog</h1>
            <div role="article" class="markdown-body">
                ${unsafeHTML(content)}
            </div>
        </div>`;
    }

    static get styles() {
        return css`
            ${unsafeCSS(mdStyle)}
        `;
    }
}
