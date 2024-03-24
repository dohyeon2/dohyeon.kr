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
    const comments = await prisma.comment
        .findMany({
            where: {
                postId: id,
            },
            include: {
                user: true,
                CommentMeta: true,
            },
        })
        .then((comments) =>
            comments.map((comment) => ({
                id: comment.id,
                postId: comment.postId,
                createdAt: comment.createdAt,
                content: comment.content,
                author: comment.user
                    ? comment.user.name
                    : comment.CommentMeta.find((x) => x.key === "author")
                          ?.value ?? "익명",
                updatedAt: comment.updatedAt,
            }))
        );

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
