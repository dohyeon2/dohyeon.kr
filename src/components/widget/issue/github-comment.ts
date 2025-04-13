import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("github-comments")
export default class GitHubComments extends LitElement {
    render() {
        return html` <giscus-widget
            id="comments"
            repo="dohyeon2/dohyeon.kr"
            repoId="R_kgDOOYZK0A"
            category="General"
            categoryId="DIC_kwDOOYZK0M4CpDzP"
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
