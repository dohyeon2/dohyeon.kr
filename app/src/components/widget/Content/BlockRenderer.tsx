interface BlockRendererProps {
    block: EditorJS.OutputBlockData;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
    switch (block.type) {
        case "paragraph":
            return <p>{block.data.text}</p>;
        default:
            return null;
    }
};
