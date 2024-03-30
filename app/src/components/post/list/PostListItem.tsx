import { day } from "@/lib/external/dayjs";
import { excerptFromContent } from "@/lib/internal/post/excerptFromContent";

interface PostListItemProps {
    title: string;
    content: string;
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
                    {day(updatedAt).format("YYYY.MM.DD HH:mm")}
                </span>
            </div>
            <p className="line-clamp-2">{excerptFromContent(content)}</p>
        </div>
    );
};
