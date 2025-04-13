import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import tradeData from "constants/mabinogi/trade-simulator/trade.json";
import vehicleData from "constants/mabinogi/trade-simulator/vehicle.json";
import partnerData from "constants/mabinogi/trade-simulator/partner.json";
import titleData from "constants/mabinogi/trade-simulator/title.json";
import "./material-checker";
import "../../components/ui/selector";
import "./components";
import "./sections";

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

    private updateTimer: number | null = null;

    private get vehicleOptions() {
        return vehicleData.map((vehicle) => ({
            value: vehicle.name,
            label: vehicle.name,
        }));
    }

    private get partnerOptions() {
        return partnerData.map((partner) => ({
            value: partner.name,
            label: partner.name,
        }));
    }

    private get titleOptions() {
        return titleData.map((title) => ({
            value: title.name,
            label: title.name,
        }));
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadAllData();
        this.loadCompletedTrades();
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

    render() {
        return html`
            <div class="flex flex-col gap-4 mx-auto max-w-screen-lg p-5">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold">교역 시뮬레이터</h1>
                    <div class="flex items-center gap-4">
                        <reset-timer></reset-timer>
                        <button
                            class="px-3 py-1 text-sm text-red-600 border border-solid border-red-600 rounded hover:bg-red-50"
                            @click=${() => this.clearAllData()}
                        >
                            초기화
                        </button>
                    </div>
                </div>
                <asset-selector-section
                    .onVehicleChange=${(vehicle: Asset | null) => {
                        this.saveVehicle(vehicle);
                    }}
                    .onPartnerChange=${(partner: Asset | null) => {
                        this.savePartner(partner);
                    }}
                    .onTitleChange=${(title: Asset | null) => {
                        this.saveTitle(title);
                    }}
                    .selectedVehicle=${this.selectedVehicle?.name}
                    .selectedPartner=${this.selectedPartner?.name}
                    .selectedTitle=${this.selectedTitle?.name}
                ></asset-selector-section>

                <capacity-info-section
                    .selectedVehicle=${this.selectedVehicle}
                    .selectedPartner=${this.selectedPartner}
                    .selectedTitle=${this.selectedTitle}
                    .totalWeight=${this.calculateTotalCapacity().totalWeight}
                    .totalSlot=${this.calculateTotalCapacity().totalSlot}
                    .usedWeight=${this.calculateCurrentUsage().usedWeight}
                    .usedSlot=${this.calculateCurrentUsage().usedSlot}
                ></capacity-info-section>

                <trade-item-selector-section
                    .completedItems=${this.completedTrades.flatMap((trade) =>
                        trade.items.flatMap((item) => item)
                    )}
                    .selectedItems=${this.selectedItems}
                    .onItemsChange=${(
                        items: Array<{ item: TradeItem; quantity: number }>
                    ) => {
                        this.saveItems(items);
                    }}
                    .onComplete=${() => {
                        this.completeTrade();
                    }}
                ></trade-item-selector-section>

                <completed-trades-section
                    .completedTrades=${this.completedTrades}
                ></completed-trades-section>

                <material-checklist-section
                    .completedTrades=${this.completedTrades}
                    .selectedItems=${this.selectedItems}
                ></material-checklist-section>
            </div>
        `;
    }
}
