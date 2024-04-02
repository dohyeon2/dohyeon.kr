import { queryClent } from "@/components/provider/Provider";
import { api } from "@/lib/external/axios";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useMutation } from "@tanstack/react-query";

export const usePostMutation = ({
    onSuccess,
}: {
    onSuccess?: ({
        result: { id },
    }: {
        result: { id: string };
    }) => Promise<void>;
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
        onSuccess: invalidateQueries,
    });

    const { mutateAsync: createPost } = useMutation({
        mutationFn: async ({ title, content, isPrivate }: Post) => {
            const { data } = await api.post("/api/post", {
                title,
                content,
                isPrivate,
            });

            return data;
        },
        onSuccess: async (res: any) => {
            await invalidateQueries();
            await onSuccess?.(res);
        },
    });

    const { mutateAsync: updatePost } = useMutation({
        mutationFn: async ({ id, title, content, isPrivate }: Post) => {
            const { data } = await api.patch(`/api/post/${id}`, {
                title,
                content,
                isPrivate,
            });

            return data;
        },
        onSuccess: async (res: any) => {
            await invalidateQueries();
            await onSuccess?.(res);
        },
    });

    return { deletePost, createPost, updatePost };
};
