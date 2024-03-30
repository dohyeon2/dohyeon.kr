import { useComment } from "@/hooks/comment/useComment";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";
import { Comment } from "@/lib/internal/post/comment/comment.model";
import { CommentItem } from "./CommentItem";
import { useRef, useState } from "react";

interface CommentsProps {
    postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const { comments = [] } = useComment({ postId });
    const [replyFor, setReplyFor] = useState<Comment | null>(null);
    const clearReplyFor = () => setReplyFor(null);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col gap-2">
            <CommentInput
                postId={postId}
                onClearReplyFor={clearReplyFor}
                replyFor={replyFor}
                ref={ref}
            />
            <CommentList className="[&_>_*]:border-b [&_>_*]:border-white/50 [&_>_*]:pb-4">
                {comments.map((comment: Comment) => (
                    <CommentItem
                        key={comment.id}
                        data={comment}
                        onClickReply={(comment) => {
                            ref.current?.querySelector("textarea")?.focus();
                            setReplyFor(comment);
                        }}
                    />
                ))}
            </CommentList>
        </div>
    );
};
