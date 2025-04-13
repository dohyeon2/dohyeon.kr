import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";

@customElement("global-footer")
export default class GlobalFooter extends TailwindElement {
    render() {
        return html`<div
            class="wrapper flex border-t border-solid border-gray-200"
        >
            <div class="flex p-5">
                <div class="flex items-center">
                    <div>
                        version :
                        ${import.meta.env.VITE_VERSION ?? "development"}
                    </div>
                </div>
            </div>
        </div>`;
    }
}
