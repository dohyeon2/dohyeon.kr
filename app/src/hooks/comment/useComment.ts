import { api } from "@/lib/external/axios";
import { Comment } from "@/lib/internal/comment/comment.model";
import { COMMENT_CONST } from "@/lib/internal/post/comment/comment.const";
import { UserImpl } from "@/lib/internal/user/user.model";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useComment = ({ postId }: { postId: string }) => {
    const { data: comments } = useSuspenseQuery({
        queryKey: [COMMENT_CONST.QUERY_KEY.GET_COMMENTS, postId],
        queryFn: async () => {
            const { data } = await api.get(`/api/post/${postId}/comment`);
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
