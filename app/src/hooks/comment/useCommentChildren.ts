import { api } from "@/lib/external/axios";
import { COMMENT_CONST } from "@/lib/internal/post/comment/comment.const";
import { Comment } from "@/lib/internal/post/comment/comment.model";
import { UserImpl } from "@/lib/internal/user/user.model";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useCommentChildren = ({ commentId }: { commentId: string }) => {
    const { data: comments } = useSuspenseQuery({
        queryKey: [COMMENT_CONST.QUERY_KEY.GET_COMMENTS, commentId],
        queryFn: async () => {
            const { data } = await api.get(
                `/api/comment/${commentId}/children`
            );
            return data.map(
                (comment: any) =>
                    new Comment({
                        ...comment,
                        author: new UserImpl({
                            name: comment.author,
                        }),
                    })
            );
        },
    });

    return {
        comments,
    };
};