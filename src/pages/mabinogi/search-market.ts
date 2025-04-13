import axios from "axios";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import { Task } from "@lit/task";

@customElement("search-market")
export class SearchMarket extends TailwindElement {
    @property({ type: String })
    material: string = "";

    @property({ type: Number })
    amount: number = 0;

    private apiURL = "https://open.api.nexon.com/mabinogi/v1/auction/list";

    private apiKey =
        "live_da554d8ba2c7f48a949eccc38b79685b7dce22dca1d10525b3be906fa3c0b9dfefe8d04e6d233bd35cf2fabdeb93fb0d";

    private cursor: string = "";

    private price: number | null = null;

    private _searchAuctionTask = new Task(this, {
        task: async ([itemName, cursor], { signal }) => {
            const { data } = await axios.get(this.apiURL, {
                headers: {
                    "x-nxopen-api-key": this.apiKey,
                },
                params: {
                    item_name: itemName,
                    cursor: cursor,
                },
            });

            return data;
        },
        args: () => [this.material, this.cursor],
    });

    render() {
        return this._searchAuctionTask.render({
            pending: () => html`<p>Loading...</p>`,
            complete: (data) => html`
                <div class="flex gap-2">
                    <div>
                        ${Intl.NumberFormat("ko-KR").format(
                            data.auction_item[0].auction_price_per_unit
                        )}
                        gold
                    </div>
                    <div>x</div>
                    <div>${this.amount}</div>
                    <div>=</div>
                    <div>
                        ${Intl.NumberFormat("ko-KR").format(
                            data.auction_item[0].auction_price_per_unit *
                                this.amount
                        )}
                        gold
                    </div>
                </div>
            `,
            error: (e) => html`<p>Error: ${e}</p>`,
        });
    }
}
