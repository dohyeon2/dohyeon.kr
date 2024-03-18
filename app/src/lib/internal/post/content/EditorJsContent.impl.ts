"use client";

import { OutputData } from "@editorjs/editorjs";
import { PostContent } from "./PostContent.interface";
import { isJson } from "../../util/isJson";

export class EditorJsContent implements PostContent {
    content: OutputData;
    constructor(content: OutputData | string) {
        this.content = this.parseContent(content);
    }

    getContentAsString() {
        return JSON.stringify(this.content);
    }

    private parseContent(content: OutputData | string) {
        if (typeof content === "string" && isJson(content)) {
            return JSON.parse(content) as OutputData;
        }
        if (typeof content === "object") {
            return content as OutputData;
        }
        throw new Error("Invalid content");
    }
}
