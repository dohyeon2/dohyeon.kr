import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";

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

interface TradeSession {
    completedAt: number;
    items: Array<{ item: TradeItem; quantity: number }>;
}

@customElement("completed-trades-section")
export class CompletedTradesSection extends TailwindElement {
    @property({ attribute: false })
    completedTrades: TradeSession[] = [];

    render() {
        const recentTrades = this.completedTrades.filter(
            (trade) => Date.now() - trade.completedAt < 7 * 24 * 60 * 60 * 1000
        );

        if (recentTrades.length === 0) {
            return html``;
        }

        return html`
            <sl-details summary="완료된 교역">
                <div class="space-y-2 grid grid-cols-2 gap-2 grid-flow-dense">
                    ${recentTrades.map(
                        (trade) => html`
                            <sl-card >
                                <div class="text-sm text-gray-500 mb-2">
                                    ${new Date(
                                        trade.completedAt
                                    ).toLocaleString()}
                                </div>
                                <div class="space-y-1">
                                    ${trade.items.map(
                                        ({ item, quantity }) => html`
                                            <div class="flex justify-between">
                                                <span>${item.name}</span>
                                                <span>${quantity}개</span>
                                            </div>
                                        `
                                    )}
                                </div>
                            </sl-card>
                        `
                    )}
                </div>
            </sl-details>
        `;
    }
}
