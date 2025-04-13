import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";
import "./github-comment";

@customElement("issue-floating")
export class IssueFloating extends TailwindElement {
    @state()
    isEnabled: boolean = false;

    @state()
    isOpen: boolean = false;

    enableIssueHandler() {
        this.isEnabled = true;
    }

    disableIssueHandler() {
        this.isEnabled = false;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("disabled-issue", this.disableIssueHandler);
        window.addEventListener("enabled-issue", this.enableIssueHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("disabled-issue", this.disableIssueHandler);
        window.removeEventListener("enabled-issue", this.enableIssueHandler);
    }

    render() {
        return html`<div class="fixed bottom-4 left-4 flex gap-4 items-end">
            <sl-button
                circle
                @click=${() => {
                    this.isOpen = !this.isOpen;
                }}
            >
                <sl-icon name="chat-left-dots"></sl-icon>
            </sl-button>
            <div class="w-fit h-fit flex-none max-h-screen max-w-screen">
                <sl-card ?hidden=${!this.isOpen}>
                    <sl-icon-button
                        name="x"
                        @click=${() => {
                            this.isOpen = false;
                        }}
                    ></sl-icon-button>
                    <github-comments></github-comments>
                </sl-card>
            </div>
        </div>`;
    }

    static enableIssue() {
        window.dispatchEvent(new Event("enabled-issue"));
    }

    static disableIssue() {
        window.dispatchEvent(new Event("disabled-issue"));
    }
}
