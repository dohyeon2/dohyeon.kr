import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";

@customElement("value-selector")
export class ValueSelector extends TailwindElement {
    @property({ type: String })
    label: string = "";

    @property({ type: Array })
    options: Array<{ value?: string; label: string }> = [];

    @property({ attribute: false })
    onChange: ((value?: string) => void) | null = null;

    @property({ type: String })
    value: string | undefined = "";

    private escapeSpace(value?: string) {
        return value?.replace(" ", "_");
    }

    private unescapeSpace(value?: string) {
        return value?.replace("_", " ");
    }

    render() {
        return html`<sl-card class="w-full">
            <h2 class="text-lg font-semibold mb-2">${this.label}</h2>
            <sl-select
                @sl-change=${(e: Event) => {
                    const select = e.target as HTMLSelectElement;
                    this.value = select.value;
                    this.onChange?.(this.unescapeSpace(this.value));
                }}
                value=${this.escapeSpace(this.value) ?? ""}
            >
                <sl-option value="">선택하세요</sl-option>
                ${this.options.map(
                    (option) => html`
                        <sl-option
                            value=${this.escapeSpace(option.value) ?? ""}
                        >
                            ${option.label}
                        </sl-option>
                    `
                )}
            </sl-select>
        </sl-card>`;
    }
}
