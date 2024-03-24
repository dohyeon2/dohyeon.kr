import { getCommentsOfComment } from "@/app/api/shared/comment/getComments";
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
    const comments = await getCommentsOfComment(id);

    return NextResponse.json(comments);
};
