import { dayjsInstance } from "@/lib/external/dayjs";
import { excerptFromContent } from "@/lib/external/editor.js/excerptFromContent";
import { PostContent } from "@/lib/internal/post/content/PostContent.interface";

interface PostListItemProps {
    title: string;
    content: PostContent;
    updatedAt?: Date;
}

export const PostListItem: React.FC<PostListItemProps> = ({
    title,
    content,
    updatedAt,
}) => {
    return (
        <div className="p-3 border rounded">
            <div className="flex justify-between">
                <h2 className="font-bold">{title}</h2>
                <span className="text-sm text-zinc-500">
                    {dayjsInstance(updatedAt).format("YYYY.MM.DD HH:mm")}
                </span>
            </div>
            <p className="line-clamp-2">
                {excerptFromContent(content.content)}
            </p>
        </div>
    );
};
