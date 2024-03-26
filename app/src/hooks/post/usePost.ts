import { api } from "@/lib/external/axios";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useQuery } from "@tanstack/react-query";

export const usePost = ({ id }: { id: string }) => {
    const { data: post, isFetched } = useQuery({
        queryKey: [POST_CONST.QUERY_KEY.GET_POST, id],
        queryFn: async () => {
            const { data } = await api.get(`/api/post/${id}`);

            return new Post({
                ...data.result,
            });
        },
    });

    return { post, isFetched };
};
