import { Comment } from "@/lib/internal/comment/comment.interface";

interface CommentItemProps {
    data: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    return (
        <div>
            <div>{data.author.name}</div>
            <div>{data.content}</div>
        </div>
    );
};
