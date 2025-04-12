import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("global-nav-bar")
export default class GlobalNavBar extends LitElement {
    render() {
        return html`<div class="wrapper">
            <h1 @click=${() => window.NavigationService.navigateTo("/")}>
                Dohyeon.kr
            </h1>
            <div class="nav-items">
                <sl-button href="/blog">Blog</sl-button>
                <sl-button href="/mabinogi/trade-simulator">
                    Trade Simulator
                </sl-button>
            </div>
        </div>`;
    }

    static styles = css`
        .wrapper {
            display: flex;
            gap: 2rem;
        }

        .nav-items {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            flex: 1;
            padding: 1rem;
        }
    `;
}
