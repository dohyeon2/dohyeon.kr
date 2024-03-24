"use client";

import { EditJsRenderer } from "@/components/widget/Content";
import { usePost } from "@/hooks/post/usePost";
import { Comments } from "../comment";
import { Title } from "../style/Title";

interface PostViewProps {
    id: string;
}

export const PostView: React.FC<PostViewProps> = ({ id }) => {
    const { post, isFetched } = usePost({ id });

    return (
        <>
            <Title>{post.title}</Title>
            <article>
                <EditJsRenderer data={post.content.content} />
            </article>
            {isFetched && <Comments postId={post.id!} />}
        </>
    );
};
