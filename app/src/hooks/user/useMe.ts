import { api } from "@/lib/external/axios";
import { USER_CONST } from "@/lib/internal/user/user.const";
import { UserImpl } from "@/lib/internal/user/user.model";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
    const { data: me } = useQuery({
        queryKey: [USER_CONST.QUERY_KEY.GET_ME],
        queryFn: async () => {
            const { data } = await api.get("/api/user/me");
            if (!data) return null;
            return new UserImpl({
                ...data,
                id: data?.id,
            });
        },
    });

    const isLoggedIn = !!me;

    return { me: me, isLoggedIn };
};
