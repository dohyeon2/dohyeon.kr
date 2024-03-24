import { prisma } from "@/lib/external/prisma";
import { Comment, CommentMeta, User } from "@prisma/client";

export const getCommentsOfPost = async (postId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId,
            parentId: null,
        },
        include: {
            user: true,
            CommentMeta: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return mapComment(comments);
};

export const getCommentsOfComment = async (commentId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            parentId: commentId,
        },
        include: {
            user: true,
            CommentMeta: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return mapComment(comments);
};

const mapComment = (
    comments: (Comment & { user: User | null; CommentMeta: CommentMeta[] })[]
) =>
    comments.map((comment) => ({
        id: comment.id,
        postId: comment.postId,
        createdAt: comment.createdAt,
        content: comment.content,
        author: comment.user
            ? comment.user.name
            : comment.CommentMeta.find((x) => x.key === "author")?.value ??
              "익명",
        updatedAt: comment.updatedAt,
    }));
