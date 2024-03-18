import { Comment } from "@/lib/internal/comment/comment.interface";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
    comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments = [] }) => {
    return (
        <div>
            {comments.map((comment) => {
                return <CommentItem key={comment.id} data={comment} />;
            })}
        </div>
    );
};
