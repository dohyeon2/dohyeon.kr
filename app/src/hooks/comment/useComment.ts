import { api } from "@/lib/external/axios";
import { COMMENT_CONST } from "@/lib/internal/post/comment/comment.const";
import { Comment } from "@/lib/internal/post/comment/comment.model";
import { UserImpl } from "@/lib/internal/user/user.model";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useComment = ({
    postId,
    suspense = false,
}: {
    postId: string;
    suspense?: boolean;
}) => {
    const query = suspense ? useSuspenseQuery : useQuery;
    const { data: comments } = query({
        queryKey: [COMMENT_CONST.QUERY_KEY.GET_COMMENTS, postId],
        queryFn: async () => {
            const { data } = await api.get(`/api/post/${postId}/comment`);
            return data.map(
                (comment: any) =>
                    new Comment({
                        ...comment,
                        author: new UserImpl({
                            id: comment.authorId,
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
