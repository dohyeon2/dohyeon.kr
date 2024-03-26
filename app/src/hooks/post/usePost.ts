import { api } from "@/lib/external/axios";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const usePost = ({
    id,
    suspense = false,
}: {
    id?: string;
    suspense?: boolean;
}) => {
    const query = suspense ? useQuery : useSuspenseQuery;
    const { data: post, isFetched } = query({
        queryKey: [POST_CONST.QUERY_KEY.GET_POST, id],
        queryFn: async () => {
            if (!id)
                return new Post({
                    title: "",
                    content: "",
                });
            const { data } = await api.get(`/api/post/${id}`);

            return new Post({
                ...data.result,
            });
        },
        enabled: !!id,
    });

    return {
        post,
        isFetched,
    };
};
