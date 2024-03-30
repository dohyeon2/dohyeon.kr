import { api } from "@/lib/external/axios";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
    const { data: posts, isFetching } = useQuery({
        queryKey: [POST_CONST.QUERY_KEY.GET_POSTS],
        queryFn: async () => {
            const { data } = await api.get("/api/post");

            return data.result.map((post: any) => {
                return new Post({
                    ...post,
                });
            });
        },
        placeholderData: (prev) => prev,
    });

    return { posts, isFetching };
};
