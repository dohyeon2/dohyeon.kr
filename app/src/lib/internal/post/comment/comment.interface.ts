import { User } from "../../user/user.interface";

export interface Comment {
    id: string;
    author: User;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    postId: string;
}
