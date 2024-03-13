"use client";

import { usePosts } from "@/hooks/post/usePosts";
import { Post } from "@/lib/internal/post/post.model";
import { PostListItem } from "./PostListItem";
import Link from "next/link";

interface PostListProps {}

export const PostList: React.FC<PostListProps> = () => {
    const { posts = [] } = usePosts();
    return (
        <div className="flex flex-col gap-5 p-4">
            {posts.map((post: Post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                    <PostListItem
                        title={post.title}
                        content={post.content}
                        updatedAt={post.updatedAt}
                    />
                </Link>
            ))}
        </div>
    );
};
