import { prisma } from "@/lib/external/prisma";
import { getLoggedInUser } from "@/lib/internal/auth";
import { NextRequest, NextResponse } from "next/server";
import { makePrivate } from "../../shared/post/isPrivate";

export const GET = async (
    req: NextRequest,
    {
        params: { id },
    }: {
        params: { id: string };
    }
) => {
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });

    return NextResponse.json({
        result: post,
    });
};

export const DELETE = async (
    req: NextRequest,
    {
        params: { id },
    }: {
        params: { id: string };
    }
) => {
    await prisma.post.delete({
        where: {
            id: id,
        },
    });

    return NextResponse.json({
        result: "success",
    });
};

export const PATCH = async (
    req: NextRequest,
    {
        params: { id },
    }: {
        params: { id: string };
    }
) => {
    const { title, content, isPrivate } = await req.json();

    const user = await getLoggedInUser();

    if (!user) {
        return NextResponse.json(
            {
                message: "로그인이 필요합니다.",
            },
            { status: 401 }
        );
    }

    const updated = await prisma.post.update({
        where: {
            id: id,
            userId: user.id,
        },
        data: {
            title,
            content,
        },
    });

    if (isPrivate) {
        await makePrivate(id);
    }

    return NextResponse.json(updated);
};
