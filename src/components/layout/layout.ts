import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import "./footer";
import "./global-nav-bar";
import "../ui/toast-container";

@customElement("global-layout")
export default class GlobalLayout extends TailwindElement {
    render() {
        return html`<div class="flex flex-col min-h-screen">
            <global-nav-bar></global-nav-bar>
            <div class="flex-1">
                <slot></slot>
            </div>
            <toast-container></toast-container>
            <global-footer></global-footer>
        </div>`;
    }
}
