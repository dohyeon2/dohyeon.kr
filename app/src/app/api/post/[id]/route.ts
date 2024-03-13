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
