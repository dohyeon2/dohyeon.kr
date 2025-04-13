import { Router } from "@lit-labs/router";
import "@shoelace-style/shoelace/dist/shoelace.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "normalize.css";
import "./pages";
import "./components/layout/layout";
import "./services";

@customElement("app-root")
export default class App extends LitElement {
    private router = new Router(this, [
        { path: "/", render: () => html`<home-page></home-page>` },
        { path: "/blog", render: () => html`<blog-page></blog-page>` },
        {
            path: "/mabinogi/trade-simulator",
            render: () => html`<trade-simulator-page></trade-simulator-page>`,
        },
    ]);

    connectedCallback() {
        super.connectedCallback();
        // 네비게이션 이벤트 리스너 추가
        window.addEventListener("navigate", async (e: Event) => {
            const customEvent = e as CustomEvent;
            await this.router.goto(customEvent.detail.path);
        });
    }

    disconnectedCallback() {
        // 이벤트 리스너 제거
        window.removeEventListener("navigate", async (e: Event) => {
            const customEvent = e as CustomEvent;
            await this.router.goto(customEvent.detail.path);
        });
        super.disconnectedCallback();
    }

    render() {
        return html`<global-layout>${this.router.outlet()}</global-layout> `;
    }
}
