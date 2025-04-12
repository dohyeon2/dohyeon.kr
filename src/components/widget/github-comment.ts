import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("github-comments")
export default class GitHubComments extends LitElement {
    render() {
        return html`<div class="utterances-container">
            <script
                src="https://utteranc.es/client.js"
                repo="dohyeon2/judo-lab"
                issue-term="pathname"
                theme="github-light"
                crossorigin="anonymous"
                async
            ></script>
        </div>`;
    }
}
