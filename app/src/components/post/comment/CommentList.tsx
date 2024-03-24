import { ReactElement } from "react";

interface CommentListProps {
    children?: ReactElement<"CommentItem"> | ReactElement<"CommentItem">[];
}

export const CommentList: React.FC<CommentListProps> = ({ children }) => {
    return (
        <div className="flex flex-col [&_>_*]:border-b [&_>_*]:py-2 border-t">
            {children}
        </div>
    );
};
