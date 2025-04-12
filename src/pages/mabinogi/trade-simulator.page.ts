import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";

@customElement("trade-simulator-page")
export default class TradeSimulatorPage extends TailwindElement {
    render() {
        return html`<div>Trade Simulator</div>`;
    }
}
