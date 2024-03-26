import { CSR } from "@/components/util/CSR";
import { Collapse } from "@/components/util/collapse";
import { useCommentChildren } from "@/hooks/comment/useCommentChildren";
import { day } from "@/lib/external/dayjs";
import { Comment } from "@/lib/internal/post/comment/comment.interface";
import classNames from "classnames";
import { CommentList } from "./CommentList";
import { useCommentMutation } from "@/hooks/comment/useCommentMutation";
import { useMe } from "@/hooks/user/useMe";
import { useState } from "react";
import { Switch } from "@/components/util/condition";
import { Case } from "@/components/util/condition/Case";

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
    const { deleteComment, updateComment } = useCommentMutation();
    const isAuthor = me?.id === data.author.id;
    const canControl = isAuthor || (!isAuthor && data.isAnonymous);
    const [isModifying, setIsModifying] = useState(false);
    const [modifiedContent, setModifiedContent] = useState(data.content);
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
                            <Switch>
                                <Case condition={!isModifying}>
                                    <div className="flex-1">{data.content}</div>
                                </Case>
                                <Case condition={isModifying}>
                                    <div className="w-full">
                                        <textarea
                                            className="w-full bg-transparent border border-white/30 p-1"
                                            value={modifiedContent}
                                            onChange={(e) => {
                                                setModifiedContent(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <div className="flex">
                                            <button
                                                className="flex-1"
                                                onClick={() => {
                                                    setIsModifying(false);
                                                }}
                                            >
                                                취소
                                            </button>
                                            <button
                                                className="flex-1"
                                                onClick={async () => {
                                                    try {
                                                        let password;
                                                        if (data.isAnonymous) {
                                                            password =
                                                                prompt(
                                                                    "비밀번호를 입력해주세요."
                                                                ) ?? undefined;
                                                        }
                                                        await updateComment({
                                                            id: data.id,
                                                            content:
                                                                modifiedContent,
                                                            password,
                                                        });
                                                    } finally {
                                                        setIsModifying(false);
                                                    }
                                                }}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                </Case>
                            </Switch>
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
                                {canControl && (
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
                                {canControl && (
                                    <button
                                        onClick={() => {
                                            setIsModifying(true);
                                        }}
                                    >
                                        수정
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
