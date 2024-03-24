-- CreateTable
CREATE TABLE "CommentMeta" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "commentId" TEXT NOT NULL,

    CONSTRAINT "CommentMeta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentMeta" ADD CONSTRAINT "CommentMeta_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
