import { CSR } from "@/components/util/CSR";
import { Collapse } from "@/components/util/collapse";
import { useCommentChildren } from "@/hooks/comment/useCommentChildren";
import { day } from "@/lib/external/dayjs";
import { Comment } from "@/lib/internal/post/comment/comment.interface";
import classNames from "classnames";
import { CommentList } from "./CommentList";

interface CommentItemProps {
    data: Comment;
    isChildren?: boolean;
    onClickReply?: (comment: Comment) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
    data,
    isChildren = false,
    onClickReply,
}) => {
    const { comments = [] } = useCommentChildren({
        commentId: data.id,
    });
    return (
        <div
            className={classNames({
                "pl-2": isChildren,
                "border-l": isChildren,
                "border-white/30": isChildren,
            })}
        >
            <Collapse>
                {({ Trigger, Content }) => (
                    <>
                        <div className="flex justify-between">
                            <div className="text-sm opacity-75">
                                {data.author.name}
                            </div>
                            <CSR>
                                <div className="opacity-50 text-sm">
                                    {day(data.updatedAt).format(
                                        "YYYY.MM.DD HH:mm"
                                    )}
                                </div>
                            </CSR>
                        </div>
                        <div className="flex">
                            <div className="flex-1">{data.content}</div>
                            <div className="flex-none opacity-75 text-sm">
                                <Trigger>메뉴</Trigger>
                            </div>
                        </div>
                        <Content>
                            <div className="flex gap-2 opacity-75 text-sm">
                                {onClickReply && (
                                    <button
                                        onClick={() => {
                                            onClickReply(data);
                                        }}
                                    >
                                        답글달기
                                    </button>
                                )}
                            </div>
                        </Content>
                        {comments.length > 0 && (
                            <div className="mt-2">
                                <CommentList>
                                    {comments.map((comment: Comment) => (
                                        <CommentItem
                                            key={comment.id}
                                            data={comment}
                                            onClickReply={onClickReply}
                                            isChildren={true}
                                        />
                                    ))}
                                </CommentList>
                            </div>
                        )}
                    </>
                )}
            </Collapse>
        </div>
    );
};
