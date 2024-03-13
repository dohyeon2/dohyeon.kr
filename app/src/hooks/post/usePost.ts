import { axiosInstance } from "@/lib/external/axios";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useSuspenseQuery } from "@tanstack/react-query";

export const usePost = ({ id }: { id: string }) => {
    const { data: post, isFetching } = useSuspenseQuery({
        queryKey: [POST_CONST.QUERY_KEY.GET_POST, id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/post/${id}`);

            return new Post(data.result);
        },
    });

    return { post, isFetching };
};
