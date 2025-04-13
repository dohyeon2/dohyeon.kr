import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("github-comments")
export default class GitHubComments extends LitElement {
    render() {
        return html` <giscus-widget
            id="comments"
            data-repo="dohyeon2/dohyeon.kr"
            data-repo-id="R_kgDOOYZK0A"
            data-category="General"
            data-category-id="DIC_kwDOOYZK0M4CpDzP"
            mapping="pathname"
            reactionsenabled="1"
            emitmetadata="1"
            inputposition="top"
            theme="light"
            lang="ko"
            strict="1"
            loading="lazy"
        ></giscus-widget>`;
    }
}
