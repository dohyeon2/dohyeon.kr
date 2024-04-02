import { prisma } from "@/lib/external/prisma";
import { getLoggedInUser } from "@/lib/internal/auth";
import { Post } from "@/lib/internal/post/post.model";
import { NextRequest, NextResponse } from "next/server";
import { makePrivate } from "../shared/post/isPrivate";

export const POST = async (req: NextRequest) => {
    const { title, content, isPrivate } = await req.json();

    const post = new Post({
        title,
        content,
        isPrivate,
    });

    const user = await getLoggedInUser();

    if (!user) {
        return NextResponse.json(
            {
                message: "로그인이 필요합니다.",
            },
            { status: 401 }
        );
    }

    const result = await prisma.post.create({
        data: {
            title,
            content: post.content,
            user: {
                connect: {
                    id: user?.id,
                },
            },
        },
    });

    if (isPrivate) {
        await makePrivate(result.id);
    }

    return NextResponse.json({
        message: "게시글이 작성되었습니다.",
        result,
    });
};

export const GET = async () => {
    const user = await getLoggedInUser();
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            OR: [
                {
                    PostMeta: {
                        none: {
                            key: "isPrivate",
                            value: "1",
                        },
                    },
                },
                {
                    userId: user?.id,
                },
            ],
        },
    });

    return NextResponse.json({
        result: posts,
    });
};
