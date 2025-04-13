import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import "../material-checker";

interface TradeItem {
    name: string;
    max: number;
    bundle: number;
    weight: number;
    materials: Array<{
        name: string;
        amount: number;
    }>;
}

@customElement("material-checklist-section")
export class MaterialChecklistSection extends TailwindElement {
    @property({ attribute: false })
    selectedItems: Array<{ item: TradeItem; quantity: number }> = [];

    render() {
        return html`
            <div class="grid grid-cols-1 gap-4">
                ${this.selectedItems.flatMap((item) => {
                    return item.item.materials.map((material) => {
                        return html`<material-checker
                            material="${material.name}"
                            amount="${material.amount * item.quantity}"
                        ></material-checker>`;
                    });
                })}
            </div>
        `;
    }
} 