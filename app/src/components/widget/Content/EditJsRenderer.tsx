import { BlockRenderer } from "./BlockRenderer";

interface EditJsRendererProps {
    data: Record<string, any>;
}

export const EditJsRenderer: React.FC<EditJsRendererProps> = ({ data }) => {
    if (!data.blocks) return <ErrorComponent />;

    return (
        <div>
            {data.blocks.map((block: EditorJS.OutputBlockData) => {
                return <BlockRenderer key={block.id} block={block} />;
            })}
        </div>
    );
};

const ErrorComponent = () => {
    return (
        <div>
            <h2>Block not found</h2>
        </div>
    );
};
