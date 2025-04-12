import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ui-button")
export default class Button extends LitElement {
    render() {
        return html`<sl-button>
            <slot></slot>
        </sl-button>`;
    }
}
