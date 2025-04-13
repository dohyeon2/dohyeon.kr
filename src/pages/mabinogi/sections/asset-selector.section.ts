import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import vehicleData from "constants/mabinogi/trade-simulator/vehicle.json";
import partnerData from "constants/mabinogi/trade-simulator/partner.json";
import titleData from "constants/mabinogi/trade-simulator/title.json";
import "../../../components/ui/selector";

interface Asset {
    name: string;
    slot?: number;
    weight?: number;
    bonus?: {
        slot: number;
        weight: number;
    };
}

@customElement("asset-selector-section")
export class AssetSelectorSection extends TailwindElement {
    @property({ attribute: false })
    onVehicleChange: ((vehicle: Asset | null) => void) | null = null;

    @property({ attribute: false })
    onPartnerChange: ((partner: Asset | null) => void) | null = null;

    @property({ attribute: false })
    onTitleChange: ((title: Asset | null) => void) | null = null;

    private get vehicleOptions() {
        return vehicleData.map(vehicle => ({
            value: vehicle.name,
            label: vehicle.name
        }));
    }

    private get partnerOptions() {
        return partnerData.map(partner => ({
            value: partner.name,
            label: partner.name
        }));
    }

    private get titleOptions() {
        return titleData.map(title => ({
            value: title.name,
            label: title.name
        }));
    }

    render() {
        return html`
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <value-selector
                    label="운송 수단"
                    .options=${this.vehicleOptions}
                    .onChange=${(value: string) => {
                        this.onVehicleChange?.(
                            vehicleData.find((v) => v.name === value) || null
                        );
                    }}
                ></value-selector>

                <value-selector
                    label="파트너"
                    .options=${this.partnerOptions}
                    .onChange=${(value: string) => {
                        this.onPartnerChange?.(
                            partnerData.find((p) => p.name === value) || null
                        );
                    }}
                ></value-selector>

                <value-selector
                    label="칭호"
                    .options=${this.titleOptions}
                    .onChange=${(value: string) => {
                        this.onTitleChange?.(
                            titleData.find((t) => t.name === value) || null
                        );
                    }}
                ></value-selector>
            </div>
        `;
    }
} 