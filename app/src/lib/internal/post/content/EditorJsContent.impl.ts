'use client';

import { OutputData } from "@editorjs/editorjs";
import { PostContent } from "./PostContent.interface";

export class EditorJsContent implements PostContent {
    content: OutputData;
    constructor(content: OutputData) {
        this.content = content;
    }

    getContentAsString() {
        return JSON.stringify(this.content);
    }
}
