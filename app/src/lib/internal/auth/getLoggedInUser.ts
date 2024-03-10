import "server-only";
import { getTokenFromCookie } from "./getTokenFromCookie";
import { verifyToken } from "../token";
import { prisma } from "@/lib/external/prisma";

export const getLoggedInUser = async () => {
    const token = getTokenFromCookie()?.value;

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
