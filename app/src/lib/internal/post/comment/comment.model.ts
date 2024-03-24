import { User } from "../../user/user.interface";
import { AuthorImpl } from "./author.model";
import { Comment as CommentInterface } from "./comment.interface";

interface CommentConstructorArgs {
    id: string;
    author: User;
    content: string;
    createdAt?: Date;
    postId: string;
    updatedAt?: Date | undefined;
}

export class Comment implements CommentInterface {
    id: string;
    author: User;
    content: string;
    createdAt: Date;
    postId: string;
    updatedAt?: Date | undefined;

    constructor(data: CommentConstructorArgs) {
        this.id = data.id;
        this.author = new AuthorImpl(data.author);
        this.content = data.content;
        this.createdAt = data.createdAt ?? new Date();
        this.postId = data.postId;
        this.updatedAt = data.updatedAt;
    }
}
