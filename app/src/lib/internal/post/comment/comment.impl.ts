import { Comment } from "../../comment/comment.interface";
import { User } from "../../user/user.interface";

export class CommentImpl implements Comment {
    id: string;
    author: User;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    postId: string;

    constructor(data: Comment) {
        this.id = data.id;
        this.author = data.author;
        this.content = data.content;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.postId = data.postId;
    }
}
