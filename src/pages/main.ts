import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import "giscus";

@customElement("main-page")
export default class MainPage extends LitElement {
    render() {
        return html`<div>
            <h1>안녕하세요. Judo-Lab에 오신걸 환영합니다.</h1>
            <giscus-widget
                id="comments"
                repo="dohyeon2/judo-lab"
                repoId="R_kgDOOXbiCA"
                category="General"
                categoryId="DIC_kwDOOXbiCM4Co-a0"
                mapping="pathname"
                reactionsenabled="1"
                emitmetadata="1"
                inputposition="top"
                theme="light"
                lang="ko"
                loading="lazy"
            ></giscus-widget>
        </div>`;
    }
}
