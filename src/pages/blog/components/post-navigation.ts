import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { keyed } from "lit/directives/keyed.js";
import { TailwindElement } from "utilities/TailwindElement";

@customElement("post-navigation")
export class PostNavigation extends TailwindElement {
    @property({ type: String })
    path: string = "";

    render() {
        return html`<div class="flex gap-2">
            ${this.path?.split("/").map((p, idx, acc) => {
                if (idx !== acc.length - 1) {
                    return keyed(
                        p,
                        html`<span class="text-gray-500">${p}</span
                            ><span class="text-gray-500">/</span>`
                    );
                }
                return keyed(
                    p,
                    html`<a
                        class="hover:text-gray-600 font-bold"
                        href="/blog/${this.path}"
                        >${p}</a
                    >`
                );
            })}
        </div>`;
    }
}
