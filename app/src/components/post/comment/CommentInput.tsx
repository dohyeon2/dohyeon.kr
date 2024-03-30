import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Form";
import { If, Switch } from "@/components/util/condition";
import { Case } from "@/components/util/condition/Case";
import { useCommentMutation } from "@/hooks/comment/useCommentMutation";
import { useMe } from "@/hooks/user/useMe";
import { Comment } from "@/lib/internal/post/comment/comment.model";
import { generateRandomUserName } from "@/lib/internal/user/name/generateRandomUserName";
import { getNameFromStorage } from "@/lib/internal/user/name/getNameFromStorage";
import { setNameIntoStorage } from "@/lib/internal/user/name/setNameIntoStorage";
import { produce } from "immer";
import { ForwardRefRenderFunction, forwardRef, useState } from "react";

interface CommentInputProps {
    postId: string;
    replyFor?: Comment | null;
    onClearReplyFor?: () => void;
}

interface FormData {
    content?: string;
    author?: string;
    password?: string;
}
const _CommentInput: ForwardRefRenderFunction<
    HTMLDivElement,
    CommentInputProps
> = ({ postId, replyFor, onClearReplyFor }, ref) => {
    const { me: author, isLoggedIn } = useMe();
    const [content, setContent] = useState<FormData>({
        author: !isLoggedIn
            ? getNameFromStorage() ?? generateRandomUserName()
            : undefined,
        password: "",
    });

    const handleChange = (
        e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const target = e.target as HTMLTextAreaElement | HTMLInputElement;
        setContent(
            produce((draft) => {
                draft[target.name as keyof typeof draft] = target.value;
            })
        );
    };

    const resetContent = () => {
        setContent((p) => ({
            ...p,
            content: "",
        }));
    };

    const { createComment } = useCommentMutation<FormData>();

    const submit = async () => {
        if (
            !content.content ||
            !content.author ||
            (!isLoggedIn && !content.password)
        ) {
            return;
        }
        await createComment({
            postId,
            parentId: replyFor?.id,
            ...content,
        });
        setNameIntoStorage(content.author);
        resetContent();
    };

    return (
        <div ref={ref} className="flex flex-col gap-2">
            <Switch>
                <Case condition={isLoggedIn}>
                    <div className="font-bold">{author?.name}</div>
                </Case>
                <Case condition={!isLoggedIn}>
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            name="author"
                            className="bg-transparent border"
                            value={content.author}
                            onChange={handleChange}
                            placeholder="이름을 입력해주세요."
                            label="이름"
                        />
                        <Input
                            type="password"
                            name="password"
                            className="bg-transparent border"
                            value={content.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력해주세요."
                            label="비밀번호"
                            withPasswordVisible
                        />
                    </div>
                </Case>
            </Switch>
            <If condition={!!replyFor}>
                <div className="flex">
                    <div className="text-sm text-gray-500 flex-1">
                        <div>
                            {replyFor?.author.name}님에게 답글을 남깁니다.
                        </div>
                        <div className="line-clamp-2">
                            원문: {replyFor?.content}
                        </div>
                    </div>
                    <div className="flex-none">
                        <Button onClick={onClearReplyFor}>답글 취소</Button>
                    </div>
                </div>
            </If>
            <textarea
                name="content"
                onChange={handleChange}
                className="bg-transparent border border-gray-300 w-full h-20 p-2"
                value={content.content}
                placeholder="보는 이를 배려하며 댓글을 입력해주세요."
            />
            <Button className="w-full" onClick={submit}>
                입력하기
            </Button>
        </div>
    );
};

export const CommentInput = forwardRef(_CommentInput);
