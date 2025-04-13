import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import { keyed } from "lit/directives/keyed.js";
import { v4 } from "uuid";

@customElement("toast-container")
export default class ToastContainer extends TailwindElement {
    @state()
    private messages: { message: string; id: string }[] = [];

    handleToast = (event: Event) => {
        const customEvent = event as CustomEvent<{
            message: string;
        }>;

        this.messages = this.messages.concat({
            message: customEvent.detail.message,
            id: v4(),
        });
    };

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener("toast", this.handleToast);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener("toast", this.handleToast);
    }

    private onHidden = () => (id: string) => {
        this.messages = this.messages.filter((m) => m.id !== id);
    };

    render() {
        return html`<div
            class="toast-container fixed bottom-4 right-4 flex flex-col gap-2 items-end"
        >
            ${this.messages.map((message) =>
                keyed(
                    message.id,
                    html`<toast-element
                        .messageId=${message.id}
                        .onHidden=${this.onHidden}
                        >${message.message}</toast-element
                    >`
                )
            )}
        </div>`;
    }

    static toast(message: string) {
        const event = new CustomEvent("toast", {
            bubbles: true,
            composed: true,
            detail: {
                message,
            },
        });

        document.dispatchEvent(event);
    }
}

@customElement("toast-element")
export class ToastElement extends TailwindElement {
    @property({
        attribute: false,
    })
    onHidden: ((messageId: string) => void) | null = null;

    @property({
        attribute: false,
    })
    messageId: string = "";

    @property({
        attribute: false,
    })
    duration: number = 300;

    @property({
        attribute: false,
    })
    delay: number = 3000;

    @state()
    private state: "in" | "out" = "out";

    constructor() {
        super();
        this.setupAnimation();
    }

    private setupAnimation() {
        requestAnimationFrame(() => {
            this.state = "in";
            setTimeout(() => {
                this.state = "out";
                setTimeout(() => {
                    this.onHidden?.(this.messageId);
                }, this.duration);
            }, this.delay + this.duration);
        });
    }

    render() {
        return html`<div
            class="toast bg-black/50 text-white px-4 py-2 rounded-full transition-all duration-300
        opacity-0
        translate-x-full
        data-[state=in]:!translate-x-0
        data-[state=in]:!opacity-100
        data-[state=out]:!translate-x-full
        data-[state=out]:!opacity-0
    "
            data-state=${this.state}
            aria-role="alert"
        >
            <slot></slot>
        </div>`;
    }
}
