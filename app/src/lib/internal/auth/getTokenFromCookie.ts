import { AUTH_CONSTS } from "@/consts/auth.consts";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import "server-only";

export const getTokenFromCookie = ({
    cookieStore = cookies(),
}: {
    cookieStore?: any;
}) => {
    const cookie = cookieStore;
    const token = cookie.get(AUTH_CONSTS.ACCESS_TOKEN_KEY);
    return token;
};
