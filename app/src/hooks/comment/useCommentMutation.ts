import { queryClent } from "@/components/provider/Provider";
import { api } from "@/lib/external/axios";
import { Comment } from "@/lib/internal/post/comment/comment.model";
import { COMMENT_CONST } from "@/lib/internal/post/comment/comment.const";
import { Post } from "@/lib/internal/post/post.model";
import { useMutation } from "@tanstack/react-query";

export const useCommentMutation = <T extends Record<string, any>>() => {
    const { mutateAsync: createComment } = useMutation({
        mutationFn: async (
            data: { postId: Post["id"]; parentId?: Comment["id"] } & T
        ) => {
            const { data: comment } = await api.post(
                `/api/post/${data.postId}/comment`,
                data
            );
            return new Comment(comment);
        },
        onSuccess: () => {
            queryClent.invalidateQueries({
                queryKey: [COMMENT_CONST.QUERY_KEY.GET_COMMENTS],
            });
        },
    });

    const { mutateAsync: updateComment } = useMutation({
        mutationFn: async (data: { id: Comment["id"] } & T) => {
            const { data: comment } = await api.put(
                `/api/comment/${data.id}`,
                data
            );
            return new Comment(comment);
        },
        onSuccess: () => {
            queryClent.invalidateQueries({
                queryKey: [COMMENT_CONST.QUERY_KEY.GET_COMMENTS],
            });
        },
    });

    const { mutateAsync: deleteComment } = useMutation({
        mutationFn: async ({
            id,
            password,
        }: {
            id: Comment["id"];
            password?: string;
        }) => {
            await api.delete(`/api/comment/${id}`, {
                headers: {
                    Authorization: "Basic " + btoa(`anonymous:${password}`),
                },
            });
        },
        onSuccess: () => {
            queryClent.invalidateQueries({
                queryKey: [COMMENT_CONST.QUERY_KEY.GET_COMMENTS],
            });
        },
    });

    return { createComment, deleteComment };
};
