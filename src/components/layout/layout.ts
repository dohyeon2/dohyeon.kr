import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./global-nav-bar";

@customElement("global-layout")
export default class GlobalLayout extends LitElement {
    render() {
        return html`<div>
            <global-nav-bar></global-nav-bar>
            <div>
                version : ${import.meta.env.VITE_VERSION ?? "development"}
            </div>
            <slot></slot>
        </div>`;
    }
}
