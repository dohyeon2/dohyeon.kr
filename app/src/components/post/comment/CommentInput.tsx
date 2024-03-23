import { CSR } from "@/components/util/CSR";
import { useCommentMutation } from "@/hooks/comment/useCommentMutation";
import { useMe } from "@/hooks/user/useMe";
import { produce } from "immer";
import { useState } from "react";

interface CommentInputProps {
    postId: string;
}

interface FormData {
    content?: string;
}
export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
    const { me: author } = useMe();
    const [content, setContent] = useState<FormData>({});

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(
            produce((draft) => {
                draft[e.target.name as keyof typeof draft] = e.target.value;
            })
        );
    };

    const resetContent = () => {
        setContent({});
    };

    const { createComment } = useCommentMutation<FormData>();

    const submit = async () => {
        await createComment({
            postId,
            ...content,
        });
        resetContent();
    };

    if (!author) return null;

    return (
        <div>
            <CSR>
                <div className="font-bold">{author?.name}</div>
            </CSR>
            <textarea
                name="content"
                onChange={handleChange}
                className="bg-transparent border-b border-gray-300 w-full h-20 p-2"
                value={content.content}
            />
            <button onClick={submit}>입력하기</button>
        </div>
    );
};
