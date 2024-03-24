import { getCommentsOfPost } from "@/app/api/shared/comment/getComments";
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
    const comments = await getCommentsOfPost(id);

    return NextResponse.json(comments);
};

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const user = await getLoggedInUser();

    const isLoggedIn = !!user;

    const DO_NOTHING = undefined;

    const comment = await prisma.comment.create({
        data: {
            userId: user?.id,
            postId: body.postId,
            content: body.content,
            parentId: body.parentId,
            CommentMeta: isLoggedIn
                ? DO_NOTHING
                : {
                      createMany: {
                          data: [
                              {
                                  key: "author",
                                  value: body.author,
                              },
                              {
                                  key: "password",
                                  value: body.password,
                              },
                          ],
                      },
                  },
        },
    });

    return NextResponse.json(comment);
};
