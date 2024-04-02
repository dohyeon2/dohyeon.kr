import { prisma } from "@/lib/external/prisma";

export const isPrivate = async (postId: string) => {
    const privateMeta = await prisma.postMeta.findFirst({
        where: {
            postId: postId,
            key: "isPrivate",
            value: "1",
        },
    });

    return !!privateMeta;
};

export const makePrivate = async (postId: string) => {
    if (await isPrivate(postId)) {
        return false;
    }

    await prisma.postMeta.create({
        data: {
            postId: postId,
            key: "isPrivate",
            value: "1",
        },
    });

    return true;
};
