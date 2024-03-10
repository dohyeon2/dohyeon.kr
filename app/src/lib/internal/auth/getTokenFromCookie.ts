import { AUTH_CONSTS } from "@/consts/auth.consts";
import { cookies } from "next/headers";
import "server-only";

export const getTokenFromCookie = () => {
    const cookie = cookies();
    const token = cookie.get(AUTH_CONSTS.ACCESS_TOKEN_KEY);
    return token;
};
