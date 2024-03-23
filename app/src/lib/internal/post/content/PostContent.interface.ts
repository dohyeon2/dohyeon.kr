export interface PostContent {
    getContentAsString(): string;
    content: Record<string, any>;
}
