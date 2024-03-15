import { isJson } from "../util/isJson";

type ContentArg = Record<string, any> | string | Object;

interface PostConstructorArgs {
    id?: string;
    title?: string;
    content?: ContentArg;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Post {
    id?: string;
    title: string;
    content: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;

    constructor({
        id,
        title,
        content,
        createdAt,
        updatedAt,
    }: PostConstructorArgs) {
        if (!title) throw new Error("title is required");
        if (!content) throw new Error("content is required");

        this.id = id;
        this.title = title ?? "";
        this.content = this.parseContent(content);
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
