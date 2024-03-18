import { axiosInstance } from "@/lib/external/axios";
import { EditorJsContent } from "@/lib/internal/post/content/EditorJsContent.impl";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
    const { data: posts, isFetching } = useQuery({
        queryKey: [POST_CONST.QUERY_KEY.GET_POSTS],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/api/post");

            return data.result.map((post: any) => {
                return new Post({
                    ...post,
                    content: new EditorJsContent(JSON.parse(post.content)),
                });
            });
        },
        placeholderData: (prev) => prev,
    });

    return { posts, isFetching };
};
