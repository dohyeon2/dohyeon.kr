import { useComment } from "@/hooks/comment/useComment";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";

interface CommentsProps {
    postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const { comments = [] } = useComment({ postId });
    return (
        <div>
            <CommentInput postId={postId} />
            <CommentList comments={comments} />
        </div>
    );
};
