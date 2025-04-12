import { Router } from "@lit-labs/router";
import "@shoelace-style/shoelace/dist/shoelace.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "normalize.css";
import "./pages";
import "./components/layout/layout";

@customElement("app-root")
export default class App extends LitElement {
    private router = new Router(this, [
        { path: "/", render: () => html`<home-page></home-page>` },
        { path: "/blog", render: () => html`<blog-page></blog-page>` },
        {
            path: "/mabinogi/trade-simulator",
            render: () => html`<trade-simulator></trade-simulator>`,
        },
    ]);

    render() {
        return html`<global-layout>${this.router.outlet()}</global-layout> `;
    }
}
