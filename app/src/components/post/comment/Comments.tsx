import { useComment } from "@/hooks/comment/useComment";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { Comment } from "@/lib/internal/comment/comment.model";
import { CommentItem } from "./CommentItem";

interface CommentsProps {
    postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const { comments = [] } = useComment({ postId });
    return (
        <div className="flex flex-col gap-2">
            <CommentInput postId={postId} />
            <CommentList>
                {comments.map((comment: Comment) => (
                    <CommentItem key={comment.id} data={comment} />
                ))}
            </CommentList>
        </div>
    );
};
