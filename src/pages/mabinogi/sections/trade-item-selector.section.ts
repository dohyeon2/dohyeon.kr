import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import tradeData from "constants/mabinogi/trade-simulator/trade.json";
import { SlChangeEvent } from "@shoelace-style/shoelace";
import classNames from "classnames";

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
    completedItems: Array<{ item: TradeItem; quantity: number }> = [];

    @property({ attribute: false })
    selectedItems: Array<{ item: TradeItem; quantity: number }> = [];

    @property({ attribute: false })
    onItemsChange:
        | ((items: Array<{ item: TradeItem; quantity: number }>) => void)
        | null = null;

    @property({ attribute: false })
    onComplete: (() => void) | null = null;

    private getRemainingMax(item: TradeItem) {
        const usedQuantity =
            this.completedItems.reduce((acc, ci) => {
                if (ci.item.name === item.name) {
                    return acc + ci.quantity;
                }
                return acc;
            }, 0) || 0;
        return item.max - usedQuantity;
    }

    private getUsedQuantity(item: TradeItem) {
        return (
            this.completedItems.reduce((acc, ci) => {
                if (ci.item.name === item.name) {
                    return acc + ci.quantity;
                }
                return acc;
            }, 0) || 0
        );
    }

    private getSelectedQuantity(item: TradeItem) {
        return (
            this.selectedItems.find((si) => si.item.name === item.name)
                ?.quantity || 0
        );
    }

    render() {
        return html`
            <sl-card class="w-full">
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
                            <sl-card>
                                <h3 class="text-lg font-medium mb-2">
                                    ${place.place}
                                </h3>
                                ${place.items.map((item) => {
                                    const remainingMax =
                                        this.getRemainingMax(item);
                                    const usedQuantity =
                                        this.getUsedQuantity(item);
                                    const selectedQuantity =
                                        this.getSelectedQuantity(item);

                                    return html`
                                        <div
                                            class="flex items-center gap-2 mb-2 ${classNames(
                                                {
                                                    "line-through opacity-30":
                                                        remainingMax === 0,
                                                }
                                            )}"
                                        >
                                            <span class="flex-1">
                                                ${item.name}<br />
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
                                                    value=${selectedQuantity}
                                                    ?disabled=${remainingMax ===
                                                    0}
                                                    @sl-change=${(
                                                        e: SlChangeEvent
                                                    ) => {
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
                            </sl-card>
                        `
                    )}
                </div>
            </sl-card>
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
