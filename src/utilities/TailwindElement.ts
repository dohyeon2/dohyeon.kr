import { css, CSSResultGroup, LitElement, unsafeCSS } from "lit";
import style from "../global.css?inline";

export abstract class TailwindElement extends LitElement {
    private static _styles: CSSResultGroup = css``;

    static get styles(): CSSResultGroup {
        return [
            css`
                ${unsafeCSS(style)}
            `,
            this._styles,
        ];
    }

    static set styles(styles: CSSResultGroup) {
        this._styles = styles;
    }
}
