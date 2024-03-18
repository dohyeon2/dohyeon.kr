import { PostContent } from "@/lib/internal/post/content/PostContent.interface";

export const excerptFromContent = (content: PostContent["content"]) => {
    if (!content) return "";
    if (typeof content !== "object") return "";
    if (!("blocks" in content)) return "";
    if (!Array.isArray(content.blocks)) return "";

    const blocks = content.blocks;
    const textBlocks = blocks.filter(isTextBlock);
    const text = textBlocks.map((block) => block.data.text).join(" ");
    return text.slice(0, 100);
};

const isTextBlock = (block: any) => block.type === "paragraph";
