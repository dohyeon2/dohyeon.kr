import { CommentInput } from "./CommentInput";
import { CommentItem } from "./CommentItem";
import { CommentList } from "./CommentList";

interface CommentsProps {}

export const Comments: React.FC<CommentsProps> = () => {
    return (
        <div>
            <CommentInput />
            <CommentList>
                <CommentItem />
            </CommentList>
        </div>
    );
};
