import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import tradeData from "constants/mabinogi/trade-simulator/trade.json";
import vehicleData from "constants/mabinogi/trade-simulator/vehicle.json";
import partnerData from "constants/mabinogi/trade-simulator/partner.json";
import titleData from "constants/mabinogi/trade-simulator/title.json";

interface Asset {
    name: string;
    slot?: number;
    weight?: number;
    bonus?: {
        slot: number;
        weight: number;
    };
}

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
    completedAt: number; // timestamp
    items: Array<{ item: TradeItem; quantity: number }>;
}

@customElement("trade-simulator-page")
export default class TradeSimulatorPage extends TailwindElement {
    // localStorage 키들
    private readonly STORAGE_KEYS = {
        SELECTED_VEHICLE: "mabinogi-trade-selected-vehicle",
        SELECTED_PARTNER: "mabinogi-trade-selected-partner",
        SELECTED_TITLE: "mabinogi-trade-selected-title",
        SELECTED_ITEMS: "mabinogi-trade-selected-items",
        COMPLETED_TRADES: "mabinogi-trade-completed-trades",
    };

    @state()
    private selectedVehicle: Asset | null = null;

    @state()
    private selectedPartner: Asset | null = null;

    @state()
    private selectedTitle: Asset | null = null;

    @state()
    private selectedItems: Array<{ item: TradeItem; quantity: number }> = [];

    @state()
    private completedTrades: TradeSession[] = [];

    @state()
    private remainingTime: string = "";

    private updateTimer: number | null = null;

    connectedCallback() {
        super.connectedCallback();
        this.loadAllData();
        this.loadCompletedTrades();
        this.startTimer();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.updateTimer) {
            window.clearInterval(this.updateTimer);
        }
    }

    // 모든 데이터 불러오기
    private loadAllData() {
        // 선택된 운송수단 불러오기
        const savedVehicle = localStorage.getItem(
            this.STORAGE_KEYS.SELECTED_VEHICLE
        );
        if (savedVehicle) {
            this.selectedVehicle = JSON.parse(savedVehicle);
        }

        // 선택된 파트너 불러오기
        const savedPartner = localStorage.getItem(
            this.STORAGE_KEYS.SELECTED_PARTNER
        );
        if (savedPartner) {
            this.selectedPartner = JSON.parse(savedPartner);
        }

        // 선택된 칭호 불러오기
        const savedTitle = localStorage.getItem(
            this.STORAGE_KEYS.SELECTED_TITLE
        );
        if (savedTitle) {
            this.selectedTitle = JSON.parse(savedTitle);
        }

        // 선택된 아이템들 불러오기
        const savedItems = localStorage.getItem(
            this.STORAGE_KEYS.SELECTED_ITEMS
        );
        if (savedItems) {
            this.selectedItems = JSON.parse(savedItems);
        }
    }

    private loadCompletedTrades() {
        const saved = localStorage.getItem(this.STORAGE_KEYS.COMPLETED_TRADES);
        if (saved) {
            this.completedTrades = JSON.parse(saved);
        }
    }

    // 모든 데이터 초기화
    private clearAllData() {
        this.selectedVehicle = null;
        this.selectedPartner = null;
        this.selectedTitle = null;
        this.selectedItems = [];
        this.completedTrades = [];

        Object.values(this.STORAGE_KEYS).forEach((key) => {
            localStorage.removeItem(key);
        });
    }

    // 각각의 데이터 저장 메서드들
    private saveVehicle(vehicle: Asset | null) {
        this.selectedVehicle = vehicle;
        if (vehicle) {
            localStorage.setItem(
                this.STORAGE_KEYS.SELECTED_VEHICLE,
                JSON.stringify(vehicle)
            );
        } else {
            localStorage.removeItem(this.STORAGE_KEYS.SELECTED_VEHICLE);
        }
    }

    private savePartner(partner: Asset | null) {
        this.selectedPartner = partner;
        if (partner) {
            localStorage.setItem(
                this.STORAGE_KEYS.SELECTED_PARTNER,
                JSON.stringify(partner)
            );
        } else {
            localStorage.removeItem(this.STORAGE_KEYS.SELECTED_PARTNER);
        }
    }

    private saveTitle(title: Asset | null) {
        this.selectedTitle = title;
        if (title) {
            localStorage.setItem(
                this.STORAGE_KEYS.SELECTED_TITLE,
                JSON.stringify(title)
            );
        } else {
            localStorage.removeItem(this.STORAGE_KEYS.SELECTED_TITLE);
        }
    }

    private saveItems(items: Array<{ item: TradeItem; quantity: number }>) {
        this.selectedItems = items;
        localStorage.setItem(
            this.STORAGE_KEYS.SELECTED_ITEMS,
            JSON.stringify(items)
        );
    }

    private calculateTotalCapacity() {
        let totalSlot = 0;
        let totalWeight = 0;

        if (this.selectedVehicle) {
            totalSlot +=
                this.selectedVehicle.slot ||
                this.selectedVehicle.bonus?.slot ||
                0;
            totalWeight +=
                this.selectedVehicle.weight ||
                this.selectedVehicle.bonus?.weight ||
                0;
        }

        if (this.selectedPartner) {
            totalSlot += this.selectedPartner.bonus?.slot || 0;
            totalWeight += this.selectedPartner.bonus?.weight || 0;
        }

        if (this.selectedTitle) {
            totalSlot += this.selectedTitle.bonus?.slot || 0;
            totalWeight += this.selectedTitle.bonus?.weight || 0;
        }

        return { totalSlot, totalWeight };
    }

    private calculateCurrentUsage() {
        let usedSlot = 0;
        let usedWeight = 0;

        this.selectedItems.forEach(({ item, quantity }) => {
            const slots = Math.ceil(quantity / item.bundle);
            usedSlot += slots;
            usedWeight += item.weight * quantity;
        });

        return { usedSlot, usedWeight };
    }

    private isOverCapacity() {
        const { totalSlot, totalWeight } = this.calculateTotalCapacity();
        const { usedSlot, usedWeight } = this.calculateCurrentUsage();

        return {
            isOverSlot: usedSlot > totalSlot,
            isOverWeight: usedWeight > totalWeight,
        };
    }

    private startTimer() {
        this.updateRemainingTime();
        this.updateTimer = window.setInterval(() => {
            this.updateRemainingTime();
        }, 1000);
    }

    private updateRemainingTime() {
        const now = new Date();
        const targetDay = 4; // 목요일
        const targetHour = 7;

        let nextThursday = new Date(now);
        nextThursday.setDate(
            now.getDate() + ((targetDay + 7 - now.getDay()) % 7)
        );
        nextThursday.setHours(targetHour, 0, 0, 0);

        if (now > nextThursday) {
            nextThursday.setDate(nextThursday.getDate() + 7);
        }

        const diff = nextThursday.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.remainingTime = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
    }

    private completeTrade() {
        const newTrade: TradeSession = {
            completedAt: Date.now(),
            items: [...this.selectedItems],
        };

        this.completedTrades = [...this.completedTrades, newTrade];
        localStorage.setItem(
            this.STORAGE_KEYS.COMPLETED_TRADES,
            JSON.stringify(this.completedTrades)
        );

        // 선택된 아이템 초기화
        this.saveItems([]);
    }

    private getRemainingTradeCount(): number {
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        return (
            5 -
            this.completedTrades.filter(
                (trade) => now - trade.completedAt < oneWeek
            ).length
        );
    }

    private getUsedItemQuantity(itemName: string): number {
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        return this.completedTrades
            .filter((trade) => now - trade.completedAt < oneWeek)
            .reduce((total, trade) => {
                const item = trade.items.find((i) => i.item.name === itemName);
                return total + (item?.quantity || 0);
            }, 0);
    }

    private getRemainingItemMax(item: TradeItem): number {
        const usedQuantity = this.getUsedItemQuantity(item.name);
        return Math.max(0, item.max - usedQuantity);
    }

    render() {
        const { totalSlot, totalWeight } = this.calculateTotalCapacity();
        const { usedSlot, usedWeight } = this.calculateCurrentUsage();
        const { isOverSlot, isOverWeight } = this.isOverCapacity();

        return html`
            <div class="flex flex-col gap-4 mx-auto max-w-screen-lg p-5">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold">교역 시뮬레이터</h1>
                    <div class="flex items-center gap-4">
                        <div class="text-sm">
                            <div class="font-medium">다음 초기화까지</div>
                            <div class="text-blue-600">
                                ${this.remainingTime}
                            </div>
                        </div>
                        <button
                            class="px-3 py-1 text-sm text-red-600 border border-solid border-red-600 rounded hover:bg-red-50"
                            @click=${() => this.clearAllData()}
                        >
                            초기화
                        </button>
                    </div>
                </div>

                <!-- 자산 선택 섹션 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-4 border border-solid rounded-lg">
                        <h2 class="text-lg font-semibold mb-2">운송 수단</h2>
                        <select
                            class="w-full p-2 border border-solid rounded"
                            @change=${(e: Event) => {
                                const select = e.target as HTMLSelectElement;
                                this.saveVehicle(
                                    vehicleData.find(
                                        (v) => v.name === select.value
                                    ) || null
                                );
                            }}
                        >
                            <option value="">선택하세요</option>
                            ${vehicleData.map(
                                (vehicle) => html`
                                    <option
                                        value=${vehicle.name}
                                        ?selected=${vehicle.name ===
                                        this.selectedVehicle?.name}
                                    >
                                        ${vehicle.name}
                                    </option>
                                `
                            )}
                        </select>
                    </div>

                    <div class="p-4 border border-solid rounded-lg">
                        <h2 class="text-lg font-semibold mb-2">파트너</h2>
                        <select
                            class="w-full p-2 border border-solid rounded"
                            @change=${(e: Event) => {
                                const select = e.target as HTMLSelectElement;
                                this.savePartner(
                                    partnerData.find(
                                        (p) => p.name === select.value
                                    ) || null
                                );
                            }}
                        >
                            <option value="">선택하세요</option>
                            ${partnerData.map(
                                (partner) => html`
                                    <option
                                        value=${partner.name}
                                        ?selected=${partner.name ===
                                        this.selectedPartner?.name}
                                    >
                                        ${partner.name}
                                    </option>
                                `
                            )}
                        </select>
                    </div>

                    <div class="p-4 border border-solid rounded-lg">
                        <h2 class="text-lg font-semibold mb-2">칭호</h2>
                        <select
                            class="w-full p-2 border border-solid rounded"
                            @change=${(e: Event) => {
                                const select = e.target as HTMLSelectElement;
                                this.saveTitle(
                                    titleData.find(
                                        (t) => t.name === select.value
                                    ) || null
                                );
                            }}
                        >
                            <option value="">선택하세요</option>
                            ${titleData.map(
                                (title) => html`
                                    <option
                                        value=${title.name}
                                        ?selected=${title.name ===
                                        this.selectedTitle?.name}
                                    >
                                        ${title.name}
                                    </option>
                                `
                            )}
                        </select>
                    </div>
                </div>

                <!-- 용량 정보 -->
                <div
                    class="p-4 border border-solid rounded-lg ${isOverSlot ||
                    isOverWeight
                        ? "border-red-500 bg-red-50"
                        : ""}"
                >
                    <h2 class="text-lg font-semibold mb-2">적재 현황</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div class="flex items-center gap-2">
                                <p class="font-medium">슬롯:</p>
                                <div
                                    class="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="h-full ${isOverSlot
                                            ? "bg-red-500"
                                            : "bg-blue-500"} transition-all"
                                        style="width: ${Math.min(
                                            100,
                                            (usedSlot / totalSlot) * 100
                                        )}%"
                                    ></div>
                                </div>
                                <p
                                    class="font-medium ${isOverSlot
                                        ? "text-red-500"
                                        : ""}"
                                >
                                    ${usedSlot} / ${totalSlot}
                                </p>
                            </div>
                            ${isOverSlot
                                ? html`<p
                                      class="text-red-500 text-sm mt-1 flex items-center gap-1"
                                  >
                                      <svg
                                          class="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                      >
                                          <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                          />
                                      </svg>
                                      슬롯 초과!
                                  </p>`
                                : ""}
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <p class="font-medium">무게:</p>
                                <div
                                    class="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="h-full ${isOverWeight
                                            ? "bg-red-500"
                                            : "bg-green-500"} transition-all"
                                        style="width: ${Math.min(
                                            100,
                                            (usedWeight / totalWeight) * 100
                                        )}%"
                                    ></div>
                                </div>
                                <p
                                    class="font-medium ${isOverWeight
                                        ? "text-red-500"
                                        : ""}"
                                >
                                    ${usedWeight} / ${totalWeight}
                                </p>
                            </div>
                            ${isOverWeight
                                ? html`<p
                                      class="text-red-500 text-sm mt-1 flex items-center gap-1"
                                  >
                                      <svg
                                          class="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                      >
                                          <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                          />
                                      </svg>
                                      무게 초과!
                                  </p>`
                                : ""}
                        </div>
                    </div>
                    ${isOverSlot || isOverWeight
                        ? html`
                              <div
                                  class="mt-4 p-2 bg-red-100 rounded text-red-700 text-sm"
                              >
                                  ⚠️ 현재 적재량이 최대 용량을 초과했습니다.
                                  교역품 수량을 조정해주세요.
                              </div>
                          `
                        : ""}
                </div>

                <!-- 교역품 선택 섹션 -->
                <div class="p-4 border border-solid rounded-lg">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold">교역품 선택</h2>
                        <button
                            class="px-3 py-1 text-sm text-green-600 border border-solid border-green-600 rounded hover:bg-green-50"
                            ?disabled=${this.selectedItems.length === 0}
                            @click=${() => this.completeTrade()}
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
                                                class="flex items-center gap-2 mb-2"
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
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max=${remainingMax}
                                                        placeholder="0"
                                                        value=${this.selectedItems.find(
                                                            (si) =>
                                                                si.item.name ===
                                                                item.name
                                                        )?.quantity || ""}
                                                        class="w-20 p-1 border border-solid rounded"
                                                        ?disabled=${remainingMax ===
                                                        0}
                                                        @change=${(
                                                            e: Event
                                                        ) => {
                                                            const input =
                                                                e.target as HTMLInputElement;
                                                            const quantity =
                                                                parseInt(
                                                                    input.value
                                                                ) || 0;

                                                            let newItems = [
                                                                ...this
                                                                    .selectedItems,
                                                            ];
                                                            const existingItemIndex =
                                                                newItems.findIndex(
                                                                    (si) =>
                                                                        si.item
                                                                            .name ===
                                                                        item.name
                                                                );

                                                            if (quantity > 0) {
                                                                if (
                                                                    existingItemIndex >=
                                                                    0
                                                                ) {
                                                                    newItems[
                                                                        existingItemIndex
                                                                    ].quantity =
                                                                        quantity;
                                                                } else {
                                                                    newItems = [
                                                                        ...newItems,
                                                                        {
                                                                            item,
                                                                            quantity,
                                                                        },
                                                                    ];
                                                                }
                                                            } else {
                                                                if (
                                                                    existingItemIndex >=
                                                                    0
                                                                ) {
                                                                    newItems =
                                                                        newItems.filter(
                                                                            (
                                                                                _,
                                                                                index
                                                                            ) =>
                                                                                index !==
                                                                                existingItemIndex
                                                                        );
                                                                }
                                                            }

                                                            this.saveItems(
                                                                newItems
                                                            );
                                                        }}
                                                    />
                                                    <div class="flex gap-1">
                                                        <button
                                                            class="px-2 py-1 text-xs text-blue-600 border border-solid border-blue-600 rounded hover:bg-blue-50"
                                                            ?disabled=${remainingMax ===
                                                            0}
                                                            @click=${() => {
                                                                let newItems = [
                                                                    ...this
                                                                        .selectedItems,
                                                                ];
                                                                const existingItemIndex =
                                                                    newItems.findIndex(
                                                                        (si) =>
                                                                            si
                                                                                .item
                                                                                .name ===
                                                                            item.name
                                                                    );

                                                                if (
                                                                    existingItemIndex >=
                                                                    0
                                                                ) {
                                                                    newItems[
                                                                        existingItemIndex
                                                                    ].quantity =
                                                                        remainingMax;
                                                                } else {
                                                                    newItems = [
                                                                        ...newItems,
                                                                        {
                                                                            item,
                                                                            quantity:
                                                                                remainingMax,
                                                                        },
                                                                    ];
                                                                }

                                                                this.saveItems(
                                                                    newItems
                                                                );
                                                            }}
                                                        >
                                                            최대
                                                        </button>
                                                        <button
                                                            class="px-2 py-1 text-xs text-red-600 border border-solid border-red-600 rounded hover:bg-red-50"
                                                            ?disabled=${!this.selectedItems.find(
                                                                (si) =>
                                                                    si.item
                                                                        .name ===
                                                                    item.name
                                                            )}
                                                            @click=${() => {
                                                                let newItems = [
                                                                    ...this
                                                                        .selectedItems,
                                                                ];
                                                                const existingItemIndex =
                                                                    newItems.findIndex(
                                                                        (si) =>
                                                                            si
                                                                                .item
                                                                                .name ===
                                                                            item.name
                                                                    );

                                                                if (
                                                                    existingItemIndex >=
                                                                    0
                                                                ) {
                                                                    newItems =
                                                                        newItems.filter(
                                                                            (
                                                                                _,
                                                                                index
                                                                            ) =>
                                                                                index !==
                                                                                existingItemIndex
                                                                        );
                                                                    this.saveItems(
                                                                        newItems
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            취소
                                                        </button>
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

                <!-- 이번 주 완료된 교역 목록 -->
                ${this.completedTrades.length > 0
                    ? html`
                          <div class="p-4 border border-solid rounded-lg">
                              <h2 class="text-lg font-semibold mb-4">
                                  완료된 교역
                              </h2>
                              <div class="space-y-2">
                                  ${this.completedTrades
                                      .filter(
                                          (trade) =>
                                              Date.now() - trade.completedAt <
                                              7 * 24 * 60 * 60 * 1000
                                      )
                                      .map(
                                          (trade) => html`
                                              <div
                                                  class="p-3 border border-solid rounded-lg"
                                              >
                                                  <div
                                                      class="text-sm text-gray-500 mb-2"
                                                  >
                                                      ${new Date(
                                                          trade.completedAt
                                                      ).toLocaleString()}
                                                  </div>
                                                  <div class="space-y-1">
                                                      ${trade.items.map(
                                                          ({
                                                              item,
                                                              quantity,
                                                          }) => html`
                                                              <div
                                                                  class="flex justify-between"
                                                              >
                                                                  <span
                                                                      >${item.name}</span
                                                                  >
                                                                  <span
                                                                      >${quantity}개</span
                                                                  >
                                                              </div>
                                                          `
                                                      )}
                                                  </div>
                                              </div>
                                          `
                                      )}
                              </div>
                          </div>
                      `
                    : ""}
            </div>
        `;
    }
}
