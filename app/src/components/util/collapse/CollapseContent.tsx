import { PropsWithChildren } from "react";

interface CollapseContentProps {
    collapsed: boolean;
}

export const CollapseContent: React.FC<
    PropsWithChildren<CollapseContentProps>
> = ({ children, collapsed }) => {
    return (
        <div
            className="overflow-hidden"
            style={{
                height: collapsed ? 0 : "auto",
            }}
        >
            {children}
        </div>
    );
};
