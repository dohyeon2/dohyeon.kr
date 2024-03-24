import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Form";
import { Switch } from "@/components/util/switch";
import { Case } from "@/components/util/switch/Case";
import { useCommentMutation } from "@/hooks/comment/useCommentMutation";
import { useMe } from "@/hooks/user/useMe";
import { generateRandomUserName } from "@/lib/internal/user/name/generateRandomUserName";
import { getNameFromStorage } from "@/lib/internal/user/name/getNameFromStorage";
import { setNameIntoStorage } from "@/lib/internal/user/name/setNameIntoStorage";
import { produce } from "immer";
import { useState } from "react";

interface CommentInputProps {
    postId: string;
}

interface FormData {
    content?: string;
    author?: string;
    password?: string;
}
export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
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
            ...content,
        });
        setNameIntoStorage(content.author);
        resetContent();
    };

    return (
        <div>
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
