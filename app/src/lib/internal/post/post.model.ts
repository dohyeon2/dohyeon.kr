interface PostConstructorArgs {
    id?: string;
    title?: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isPrivate?: boolean;
}

export class Post {
    id?: string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    isPrivate?: boolean;

    constructor({
        id,
        title,
        content,
        createdAt,
        updatedAt,
        isPrivate,
    }: PostConstructorArgs) {
        if (typeof title !== "string") throw new Error("title is required");
        if (typeof content !== "string") throw new Error("content is required");

        this.id = id;
        this.title = title ?? "";
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isPrivate = isPrivate;
    }
}
