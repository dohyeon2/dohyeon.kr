import { PostContent } from "./content/PostContent.interface";

interface PostConstructorArgs {
    id?: string;
    title?: string;
    content?: PostContent;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Post {
    id?: string;
    title: string;
    content: PostContent;
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
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
