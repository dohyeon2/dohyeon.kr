"use client";

import { usePost } from "@/hooks/post/usePost";
import { usePostMutation } from "@/hooks/post/usePostMutation";
import { Post } from "@/lib/internal/post/post.model";
import { Editor } from ".";
import { useRouter } from "next/navigation";

interface PostEditorProps {
    id?: string;
}

export const PostEditor: React.FC<PostEditorProps> = ({ id }) => {
    const { post = undefined } = usePost({ id });
    const isModifying = !!post?.id;
    const { createPost, updatePost } = usePostMutation({
        onSuccess: async ({ result: { id } }: { result: { id: string } }) => {
            if (isModifying) {
                alert("수정되었습니다.");
            } else {
                alert("작성되었습니다.");
            }
            router.push(`/post/${id}`);
        },
    });

    const router = useRouter();

    const onSubmit = async (data: Post) => {
        if (isModifying) {
            await updatePost({ id: post!.id, ...data });
        } else {
            const post = await createPost(data);
        }
    };

    return <Editor onSubmit={onSubmit} initialData={post} />;
};
