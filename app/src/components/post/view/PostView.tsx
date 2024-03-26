"use client";

import { EditJsRenderer } from "@/components/widget/Content";
import { usePost } from "@/hooks/post/usePost";
import { Comments } from "../comment";
import { Title } from "../style/Title";
import MDEditor from "@uiw/react-md-editor";
import { usePostMutation } from "@/hooks/post/usePostMutation";
import { useRouter } from "next/navigation";
import { day } from "@/lib/external/dayjs";

interface PostViewProps {
    id: string;
}

export const PostView: React.FC<PostViewProps> = ({ id }) => {
    const { post, isFetched } = usePost({ id });
    const { deletePost } = usePostMutation();
    const router = useRouter();

    if (!isFetched || !post) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Title>{post.title}</Title>
                <hr className="border-white/50" />
                <div className="flex text-white/50">
                    <div className="flex-1 flex gap-2">
                        <button
                            onClick={() => {
                                router.push(`/admin/post/editor?id=${post.id}`);
                            }}
                        >
                            수정
                        </button>
                        <button
                            onClick={async () => {
                                if (confirm("정말 삭제하시겠습니까?")) {
                                    await deletePost({ id: post.id! });
                                    router.push("/");
                                }
                            }}
                        >
                            삭제
                        </button>
                    </div>
                    <div>{day(post.createdAt).format("YYYY-MM-DD")}</div>
                </div>
            </div>
            <article>
                <MDEditor.Markdown
                    source={post.content}
                    skipHtml
                    className="!bg-transparent !text-white"
                />
            </article>
            {isFetched && <Comments postId={post.id!} />}
        </div>
    );
};
