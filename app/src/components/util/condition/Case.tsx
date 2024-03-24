import { PropsWithChildren } from "react";

interface CaseProps {
    condition: boolean;
}

export const Case: React.FC<PropsWithChildren<CaseProps>> = ({
    condition,
    children,
}) => {
    return <>{condition ? children : null}</>;
};
