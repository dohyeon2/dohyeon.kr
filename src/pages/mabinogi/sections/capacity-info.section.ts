import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";

@customElement("capacity-info-section")
export class CapacityInfoSection extends TailwindElement {
    @property({ type: Number })
    usedSlot: number = 0;

    @property({ type: Number })
    totalSlot: number = 0;

    @property({ type: Number })
    usedWeight: number = 0;

    @property({ type: Number })
    totalWeight: number = 0;

    private get isOverSlot() {
        return this.usedSlot > this.totalSlot;
    }

    private get isOverWeight() {
        return this.usedWeight > this.totalWeight;
    }

    render() {
        return html`
            <div
                class="p-4 border border-solid rounded-lg ${this.isOverSlot ||
                this.isOverWeight
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
                                    class="h-full ${this.isOverSlot
                                        ? "bg-red-500"
                                        : "bg-blue-500"} transition-all"
                                    style="width: ${Math.min(
                                        100,
                                        (this.usedSlot / this.totalSlot) * 100
                                    )}%"
                                ></div>
                            </div>
                            <p
                                class="font-medium ${this.isOverSlot
                                    ? "text-red-500"
                                    : ""}"
                            >
                                ${this.usedSlot} / ${this.totalSlot}
                            </p>
                        </div>
                        ${this.isOverSlot
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
                                    class="h-full ${this.isOverWeight
                                        ? "bg-red-500"
                                        : "bg-green-500"} transition-all"
                                    style="width: ${Math.min(
                                        100,
                                        (this.usedWeight / this.totalWeight) * 100
                                    )}%"
                                ></div>
                            </div>
                            <p
                                class="font-medium ${this.isOverWeight
                                    ? "text-red-500"
                                    : ""}"
                            >
                                ${this.usedWeight} / ${this.totalWeight}
                            </p>
                        </div>
                        ${this.isOverWeight
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
                ${this.isOverSlot || this.isOverWeight
                    ? html`
                          <div
                              class="mt-4 p-2 bg-red-100 rounded text-red-700 text-sm"
                          >
                              ⚠️ 현재 적재량이 최대 용량을 초과했습니다. 교역품
                              수량을 조정해주세요.
                          </div>
                      `
                    : ""}
            </div>
        `;
    }
} 