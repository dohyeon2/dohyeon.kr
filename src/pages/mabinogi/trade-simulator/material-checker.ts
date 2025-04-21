import classNames from "classnames";
import materialsData from "constants/mabinogi/trade-simulator/materials.json";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { TailwindElement } from "utilities/TailwindElement";
import ToastContainer from "../../../components/ui/toast-container";
import "./search-market";
import { SlChangeEvent } from "@shoelace-style/shoelace";

@customElement("material-checker")
export class MaterialChecker extends TailwindElement {
    @property({ type: String })
    parentPath: string = "";

    @property({ type: String })
    material: string = "";

    @property({ type: Number })
    amount: number = 0;

    @property({ type: Boolean })
    searchMarket: boolean = false;

    @property({ attribute: false })
    onChange: ((path: string) => void) | null = null;

    @property({ attribute: false })
    completedMaterials: Array<string> = [];

    get path() {
        return [this.parentPath, this.material].filter(Boolean).join(".");
    }

    private get isAncestorsCompleted() {
        return this.completedMaterials.some((material) => {
            return (
                this.path.startsWith(material) &&
                material.length < this.path.length
            );
        });
    }

    private get isCompleted() {
        const isCurrentCompleted = this.completedMaterials.includes(this.path);

        return isCurrentCompleted;
    }

    private searchMarketTimeout: NodeJS.Timeout | null = null;

    render() {
        const material = materialsData.find((m) => m.name === this.material);

        if (!material) {
            return html`<div>
                <div>존재하지 않는 재료입니다.</div>
            </div>`;
        }

        const ingredients = material.ingredients ?? [];

        const isCompleted = this.isCompleted || this.isAncestorsCompleted;

        return html`<div
            class="flex flex-col gap-2 p-3 border rounded-md border-gray-300 border-solid ${classMap(
                {
                    "bg-green-300": isCompleted,
                    "opacity-45": isCompleted,
                }
            )}"
        >
            <div class="flex gap-2">
                <sl-checkbox
                    class="w-6 h-6"
                    ?checked=${isCompleted}
                    ?disabled=${this.isAncestorsCompleted}
                    @sl-change=${(e: SlChangeEvent) => {
                        this.onChange?.(this.path);
                    }}
                > </sl-checkbox>
                <div
                    class="${classNames({
                        "line-through opacity-30": isCompleted,
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
                                      .material="${ingredient.name}"
                                      .amount="${ingredient.amount *
                                      this.amount}"
                                      .parentPath="${this.path}"
                                      .completedMaterials=${this
                                          .completedMaterials}
                                      .onChange=${this.onChange}
                                  ></material-checker>`;
                              })}
                          </div>`
                        : ""
                }
            </div>
        </div> `;
    }
}
