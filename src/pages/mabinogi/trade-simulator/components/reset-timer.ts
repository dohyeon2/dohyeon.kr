import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TailwindElement } from "utilities/TailwindElement";

@customElement("reset-timer")
export class ResetTimer extends TailwindElement {
    @state()
    private remainingTime: string = "";

    // 타이머 업데이트 인터벌
    private updateTimer: number | null = null;

    connectedCallback() {
        super.connectedCallback();
        this.startTimer();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.updateTimer) {
            window.clearInterval(this.updateTimer);
        }
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

    render() {
        return html`<div>${this.remainingTime}</div>`;
    }
}
