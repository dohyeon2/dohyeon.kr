import { prisma } from "@/lib/external/prisma";
import { FORBIDDEN, NOT_FOUND } from "http-status";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
    req: NextRequest,
    {
        params: { id },
    }: {
        params: {
            id: string;
        };
    }
) => {
    // ! it has to be set challenge token in middleware
    const headers = req.headers;

    const comment = await prisma.comment.findUnique({
        where: {
            id,
        },
        include: {
            CommentMeta: true,
        },
    });

    if (!comment) {
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: NOT_FOUND,
            }
        );
    }

    const isCommentAnnonymous = !comment?.userId;

    if (isCommentAnnonymous) {
        const authorization = headers.get("authorization");
        const password = atob(authorization?.split(" ")[1] ?? "").split(":")[1];
        const commentPassword = comment?.CommentMeta.find(
            (x) => x.key === "password"
        )?.value;
        if (password !== commentPassword) {
            return NextResponse.json(
                {
                    success: false,
                },
                {
                    status: FORBIDDEN,
                }
            );
        }
    }

    await prisma.comment.delete({
        where: {
            id: comment?.id,
        },
    });

    return NextResponse.json({
        success: true,
    });
};
