import { prisma } from "@/lib/external/prisma";
import { NextRequest, NextResponse } from "next/server";

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
