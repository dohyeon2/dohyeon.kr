import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";

@customElement("global-nav-bar")
export default class GlobalNavBar extends TailwindElement {
    render() {
        return html`<div
            class="wrapper flex border-b border-solid border-gray-200"
        >
            <div class="flex p-5">
                <div class="flex items-center">
                    <h1
                        @click=${() => window.NavigationService.navigateTo("/")}
                        class="font-bold text-2xl cursor-pointer hover:opacity-70"
                    >
                        Dohyeon.kr
                    </h1>
                </div>
            </div>
            <div class="justify-end flex gap-2 flex-1 p-5">
                <sl-button href="/blog">Blog</sl-button>
                <!-- <sl-button href="/mabinogi/trade-simulator">
                    Trade Simulator
                </sl-button> -->
            </div>
        </div>`;
    }
}
