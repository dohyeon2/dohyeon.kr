import markdownToTxt from "markdown-to-txt";

export const excerptFromContent = (content: string) => {
    return markdownToTxt(content).slice(0, 100);
};
