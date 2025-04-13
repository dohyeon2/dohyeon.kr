import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "giscus";

@customElement("blog-page")
export default class BlogPage extends LitElement {
    render() {
        return html`<div>
            <h1>Blog</h1>
        </div>`;
    }
}
