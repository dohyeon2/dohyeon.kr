import { api } from "@/lib/external/axios";
import { EditorJsContent } from "@/lib/internal/post/content/EditorJsContent.impl";
import { POST_CONST } from "@/lib/internal/post/post.const";
import { Post } from "@/lib/internal/post/post.model";
import { useSuspenseQuery } from "@tanstack/react-query";

export const usePost = ({ id }: { id: string }) => {
    const { data: post, isFetched } = useSuspenseQuery({
        queryKey: [POST_CONST.QUERY_KEY.GET_POST, id],
        queryFn: async () => {
            const { data } = await api.get(`/api/post/${id}`);

            return new Post({
                ...data.result,
                content: new EditorJsContent(JSON.parse(data.result.content)),
            });
        },
    });

    return { post, isFetched };
};
