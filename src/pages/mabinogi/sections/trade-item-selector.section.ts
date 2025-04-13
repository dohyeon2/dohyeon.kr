import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import tradeData from "constants/mabinogi/trade-simulator/trade.json";
import { classMap } from "lit/directives/class-map.js";

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

@customElement("trade-item-selector-section")
export class TradeItemSelectorSection extends TailwindElement {
    @property({ attribute: false })
    selectedItems: Array<{ item: TradeItem; quantity: number }> = [];

    @property({ attribute: false })
    onItemsChange:
        | ((items: Array<{ item: TradeItem; quantity: number }>) => void)
        | null = null;

    @property({ attribute: false })
    onComplete: (() => void) | null = null;

    @property({ type: Function })
    getRemainingItemMax: (item: TradeItem) => number = () => 0;

    @property({ type: Function })
    getUsedItemQuantity: (itemName: string) => number = () => 0;

    render() {
        return html`
            <div class="p-4 border border-solid rounded-lg">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">교역품 선택</h2>
                    <button
                        class="px-3 py-1 text-sm text-green-600 border border-solid border-green-600 rounded hover:bg-green-50"
                        ?disabled=${this.selectedItems.length === 0}
                        @click=${() => this.onComplete?.()}
                    >
                        교역 완료
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${tradeData.map(
                        (place) => html`
                            <div class="p-4 border border-solid rounded-lg">
                                <h3 class="text-lg font-medium mb-2">
                                    ${place.place}
                                </h3>
                                ${place.items.map((item) => {
                                    const remainingMax =
                                        this.getRemainingItemMax(item);
                                    const usedQuantity =
                                        this.getUsedItemQuantity(item.name);
                                    return html`
                                        <div
                                            class="flex items-center gap-2 mb-2 ${classMap(
                                                {
                                                    "line-through opacity-30":
                                                        remainingMax === 0,
                                                }
                                            )}"
                                        >
                                            <span class="flex-1">
                                                ${item.name}
                                                <span
                                                    class="text-sm text-gray-500"
                                                >
                                                    (남은 개수:
                                                    ${remainingMax}개
                                                    ${usedQuantity > 0
                                                        ? html`/ 사용:
                                                          ${usedQuantity}개`
                                                        : ""})
                                                </span>
                                            </span>
                                            <div
                                                class="flex items-center gap-1"
                                            >
                                                <sl-input
                                                    type="number"
                                                    min="0"
                                                    max=${remainingMax}
                                                    placeholder="0"
                                                    value=${this.selectedItems.find(
                                                        (si) =>
                                                            si.item.name ===
                                                            item.name
                                                    )?.quantity || ""}
                                                    ?disabled=${remainingMax ===
                                                    0}
                                                    @sl-change=${(e: Event) => {
                                                        const input =
                                                            e.target as HTMLInputElement;
                                                        const quantity =
                                                            parseInt(
                                                                input.value
                                                            ) || 0;
                                                        this.updateSelectedItems(
                                                            item,
                                                            quantity
                                                        );
                                                    }}
                                                >
                                                </sl-input>
                                                <div class="flex gap-1">
                                                    <sl-button
                                                        ?disabled=${remainingMax ===
                                                        0}
                                                        @click=${() =>
                                                            this.updateSelectedItems(
                                                                item,
                                                                remainingMax
                                                            )}
                                                    >
                                                        최대
                                                    </sl-button>
                                                    <sl-button
                                                        ?disabled=${!this.selectedItems.find(
                                                            (si) =>
                                                                si.item.name ===
                                                                item.name
                                                        )}
                                                        @click=${() =>
                                                            this.updateSelectedItems(
                                                                item,
                                                                0
                                                            )}
                                                    >
                                                        취소
                                                    </sl-button>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                })}
                            </div>
                        `
                    )}
                </div>
            </div>
        `;
    }

    private updateSelectedItems(item: TradeItem, quantity: number) {
        let newItems = [...this.selectedItems];
        const existingItemIndex = newItems.findIndex(
            (si) => si.item.name === item.name
        );

        if (quantity > 0) {
            if (existingItemIndex >= 0) {
                newItems[existingItemIndex].quantity = quantity;
            } else {
                newItems = [...newItems, { item, quantity }];
            }
        } else {
            if (existingItemIndex >= 0) {
                newItems = newItems.filter(
                    (_, index) => index !== existingItemIndex
                );
            }
        }

        this.onItemsChange?.(newItems);
    }
}
