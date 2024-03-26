import { queryClent } from "@/components/provider/Provider";
import { api } from "@/lib/external/axios";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { useMutation } from "@tanstack/react-query";

export const usePostMutation = () => {
    const { mutateAsync: deletePost } = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            await api.delete(`/api/post/${id}`);
        },
        onMutate: async () => {
            for (const key of [
                POST_CONST.QUERY_KEY.GET_POST,
                POST_CONST.QUERY_KEY.GET_POSTS,
            ]) {
                queryClent.invalidateQueries({
                    queryKey: [key],
                });
            }
        },
    });

    return { deletePost };
};
