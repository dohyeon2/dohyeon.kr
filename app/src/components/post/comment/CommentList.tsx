import classNames from "classnames";
import { ReactElement } from "react";

interface CommentListProps {
    children?: ReactElement<"CommentItem"> | ReactElement<"CommentItem">[];
    className?: string;
}

export const CommentList: React.FC<CommentListProps> = ({
    children,
    className,
}) => {
    return (
        <div className={classNames("flex flex-col gap-4", className)}>
            {children}
        </div>
    );
};
