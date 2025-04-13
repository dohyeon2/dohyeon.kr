import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

    @state()
    completedMaterials: Array<string> = [];

    constructor() {
        super();
        this.completedMaterials = JSON.parse(
            localStorage.getItem("completedMaterials") || "[]"
        );
    }

    private onChange = (path: string) => {
        let newCompletedMaterials = [...this.completedMaterials];
        const isIncluded = newCompletedMaterials.includes(path);

        newCompletedMaterials = newCompletedMaterials.filter(
            (completedPath) => !completedPath.startsWith(path)
        );

        if (!isIncluded) {
            newCompletedMaterials.push(path);
        }

        localStorage.setItem(
            "completedMaterials",
            JSON.stringify(newCompletedMaterials)
        );

        this.completedMaterials = newCompletedMaterials;
    };

    render() {
        return html`
            <div class="grid grid-cols-1 gap-4">
                ${this.selectedItems.flatMap((item) => {
                    return item.item.materials.map((material) => {
                        return html`<material-checker
                            material="${material.name}"
                            amount="${material.amount * item.quantity}"
                            .completedMaterials=${this.completedMaterials}
                            .onChange=${(path: string) => {
                                this.onChange?.(path);
                            }}
                        ></material-checker>`;
                    });
                })}
            </div>
        `;
    }
}
