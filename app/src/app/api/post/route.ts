import { prisma } from "@/lib/external/prisma";
import { getLoggedInUser } from "@/lib/internal/auth";
import { Post } from "@/lib/internal/post/post.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { title, content } = await req.json();

    const post = new Post({
        title,
        content,
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

    return NextResponse.json({
        message: "게시글이 작성되었습니다.",
        result,
    });
};

export const GET = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return NextResponse.json({
        result: posts,
    });
};
