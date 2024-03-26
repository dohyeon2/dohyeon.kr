import { queryClent } from "@/components/provider/Provider";
import { api } from "@/lib/external/axios";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useMutation } from "@tanstack/react-query";

export const usePostMutation = ({
    onMutate,
}: {
    onMutate?: (post?: Post) => Promise<void>;
} = {}) => {
    const invalidateQueries = async () => {
        for (const key of [
            POST_CONST.QUERY_KEY.GET_POST,
            POST_CONST.QUERY_KEY.GET_POSTS,
        ]) {
            await queryClent.invalidateQueries({
                queryKey: [key],
            });
        }
    };

    const { mutateAsync: deletePost } = useMutation({
        mutationFn: async ({ id }: { id: string }): Promise<undefined> => {
            await api.delete(`/api/post/${id}`);
            return undefined;
        },
        onMutate: invalidateQueries,
    });

    const { mutateAsync: createPost } = useMutation({
        mutationFn: async ({ title, content }: Post) => {
            const { data } = await api.post("/api/post", {
                title,
                content,
            });

            return data;
        },
        onMutate: async (post: Post) => {
            await invalidateQueries();
            await onMutate?.(post);
        },
    });

    const { mutateAsync: updatePost } = useMutation({
        mutationFn: async ({ id, title, content }: Post) => {
            const { data } = await api.patch(`/api/post/${id}`, {
                title,
                content,
            });

            return data;
        },
        onMutate: async (post: Post) => {
            await invalidateQueries();
            await onMutate?.(post);
        },
    });

    return { deletePost, createPost, updatePost };
};
