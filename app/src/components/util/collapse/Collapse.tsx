import { PropsWithChildren, ReactElement, ReactNode, useState } from "react";
import { CollapseContent } from "./CollapseContent";
import { CollapseTrigger } from "./CollapseTrigger";

interface CollapseProps {
    children: ({
        Content,
        Trigger,
    }: {
        Content: ({ children }: { children: ReactNode }) => ReactElement;
        Trigger: ({ children }: { children: ReactNode }) => ReactElement;
    }) => ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);

    const Content = ({ children }: PropsWithChildren) => {
        return (
            <CollapseContent collapsed={collapsed}>{children}</CollapseContent>
        );
    };
    const Trigger = ({ children }: PropsWithChildren) => {
        return (
            <CollapseTrigger
                onClick={() => {
                    setCollapsed(!collapsed);
                }}
            >
                {children}
            </CollapseTrigger>
        );
    };

    return (
        <div>
            {children({
                Content,
                Trigger,
            })}
        </div>
    );
};
