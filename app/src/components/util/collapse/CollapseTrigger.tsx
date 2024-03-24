import { PropsWithChildren } from "react";

interface CollapseTriggerProps {
    onClick: () => void;
}

export const CollapseTrigger: React.FC<
    PropsWithChildren<CollapseTriggerProps>
> = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
};
