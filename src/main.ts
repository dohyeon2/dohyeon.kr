import { Router } from "@lit-labs/router";
import "@shoelace-style/shoelace/dist/shoelace.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "normalize.css";
import "./pages";

@customElement("app-root")
export default class App extends LitElement {
    private router = new Router(this, [
        {
            path: "/mabinogi/trade-simulator",
            render: () => html`<trade-simulator-page></trade-simulator-page>`,
        },
        {
            path: "/",
            render: () => html`<main-page></main-page>`,
        },
    ]);

    render() {
        return html` <div id="app">${this.router.outlet()}</div> `;
    }
}
