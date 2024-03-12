import { isJson } from "../util/isJson";

type ContentArg = Record<string, any> | string | Object;

interface PostConstructorArgs {
    title?: string;
    content?: ContentArg;
}

export class Post {
    title: string;
    content: Record<string, any>;

    constructor({ title, content }: PostConstructorArgs) {
        if (!title) throw new Error("title is required");
        if (!content) throw new Error("content is required");

        this.title = title;
        this.content = this.parseContent(content);
    }

    private parseContent(content: ContentArg) {
        if (typeof content === "string") {
            if (isJson(content)) {
                return JSON.parse(content);
            } else {
                throw new Error("content is not a valid json");
            }
        } else {
            return content;
        }
    }
}
