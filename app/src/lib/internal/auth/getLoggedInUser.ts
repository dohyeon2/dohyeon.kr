import { prisma } from "@/lib/external/prisma";
import { cookies } from "next/headers";
import "server-only";
import { verifyToken } from "../token";
import { getTokenFromCookie } from "./getTokenFromCookie";

export const getLoggedInUser = async ({
    cookieStore = cookies(),
}: {
    cookieStore?: any;
} = {}) => {
    const token = getTokenFromCookie({
        cookieStore,
    })?.value;

    if (!token) {
        return null;
    }

    const userId = verifyToken(token).sub as string;

    return prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
};
