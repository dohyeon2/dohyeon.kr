import classNames from "classnames";
import materialsData from "constants/mabinogi/trade-simulator/materials.json";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { TailwindElement } from "utilities/TailwindElement";
import ToastContainer from "../../components/ui/toast-container";
import "./search-market";

@customElement("material-checker")
export class MaterialChecker extends TailwindElement {
    @property({ type: String })
    material: string = "";

    @property({ type: Number })
    amount: number = 0;

    @property({ type: Boolean })
    isCompleted: boolean = false;

    @property({ type: Boolean })
    searchMarket: boolean = false;

    @property({ attribute: false })
    onCompletedChange: ((isCompleted: boolean) => void) | null = null;

    private searchMarketTimeout: number | null = null;

    updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("isCompleted")) {
            this.onCompletedChange?.(this.isCompleted);
        }
    }

    render() {
        const material = materialsData.find((m) => m.name === this.material);

        if (!material) {
            return html`<div>
                <div>존재하지 않는 재료입니다.</div>
            </div>`;
        }

        const ingredients = material.ingredients ?? [];

        return html`<div
            class="flex flex-col gap-2 p-3 border rounded-md border-gray-300 border-solid ${classMap(
                {
                    "bg-green-300": this.isCompleted,
                    "opacity-45": this.isCompleted,
                }
            )}"
        >
            <div class="flex gap-2">
                <input
                    type="checkbox"
                    .checked=${this.isCompleted}
                    class="w-6 h-6"
                    @change=${(e: Event) => {
                        this.isCompleted = (
                            e.target as HTMLInputElement
                        ).checked;
                    }}
                />
                <div
                    class="${classNames({
                        "line-through opacity-30": this.isCompleted,
                    })} text-left flex-1 hover:bg-gray-100 cursor-pointer relative"
                    @click=${() => {
                        ToastContainer.toast(
                            `이름이 복사되었습니다  : ${this.material}`
                        );
                        if (navigator.clipboard) {
                            navigator.clipboard.writeText(this.material);
                        } else {
                            const textarea = document.createElement("textarea");
                            textarea.value = this.material;
                            document.body.appendChild(textarea);
                            textarea.select();
                            document.execCommand("copy");
                            document.body.removeChild(textarea);
                        }
                    }}
                    @pointerenter=${() => {
                        this.searchMarketTimeout &&
                            clearTimeout(this.searchMarketTimeout);
                        this.searchMarketTimeout = setTimeout(() => {
                            this.searchMarket = true;
                        }, 1000);
                    }}
                    @pointerleave=${() => {
                        this.searchMarketTimeout &&
                            clearTimeout(this.searchMarketTimeout);
                        this.searchMarket = false;
                    }}
                >
                    ${this.material}
                    ${
                        this.searchMarket
                            ? html`<div
                                  class="absolute top-full mt-2 z-10 bg-black/80 text-white border border-solid p-2 rounded-md"
                              >
                                  <search-market
                                      material="${this.material}"
                                      amount="${this.amount}"
                                  ></search-market>
                              </div>`
                            : ""
                    }
                </div>
                <div>${this.amount}개</div>
            </div>
                ${
                    ingredients.length > 0
                        ? html`<div class="flex flex-col gap-2">
                              ${ingredients.map((ingredient) => {
                                  return html`<material-checker
                                      material="${ingredient.name}"
                                      .amount="${ingredient.amount *
                                      this.amount}"
                                      .isCompleted=${this.isCompleted}
                                  ></material-checker>`;
                              })}
                          </div>`
                        : ""
                }
            </div>
        </div> `;
    }
}
