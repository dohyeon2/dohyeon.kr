import { prisma } from "@/lib/external/prisma";
import { getLoggedInUser } from "@/lib/internal/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    {
        params: { id },
    }: {
        params: {
            id: string;
        };
    }
) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId: id,
        },
        include: {
            user: true,
        },
    });

    return NextResponse.json(comments);
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const user = await getLoggedInUser();
    if (!user) {
        return NextResponse.json(new Error("로그인이 필요합니다."), {
            status: 401,
        });
    }
    const comment = await prisma.comment.create({
        data: {
            userId: user?.id,
            postId: body.postId,
            content: body.content,
        },
    });

    return NextResponse.json(comment);
};
