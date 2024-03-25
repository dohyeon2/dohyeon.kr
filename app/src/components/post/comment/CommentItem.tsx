import { CSR } from "@/components/util/CSR";
import { Collapse } from "@/components/util/collapse";
import { useCommentChildren } from "@/hooks/comment/useCommentChildren";
import { day } from "@/lib/external/dayjs";
import { Comment } from "@/lib/internal/post/comment/comment.interface";
import classNames from "classnames";
import { CommentList } from "./CommentList";
import { useCommentMutation } from "@/hooks/comment/useCommentMutation";
import { useMe } from "@/hooks/user/useMe";

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
    const { me } = useMe();
    const { comments = [] } = useCommentChildren({
        commentId: data.id,
    });
    const { deleteComment } = useCommentMutation();
    const isAuthor = me?.id === data.author.id;
    const canDelete = isAuthor || data.isAnonymous;
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
                                {canDelete && (
                                    <button
                                        onClick={() => {
                                            let password = undefined;
                                            if (data.isAnonymous) {
                                                password =
                                                    prompt(
                                                        "비밀번호를 입력해주세요."
                                                    ) ?? undefined;
                                            }
                                            deleteComment({
                                                id: data.id,
                                                password,
                                            });
                                        }}
                                    >
                                        삭제
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
