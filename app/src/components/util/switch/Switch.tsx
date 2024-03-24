import { ReactElement } from "react";

interface SwitchProps {
    children: ReactElement<"Case"> | ReactElement<"Case">[];
}

export const Switch: React.FC<SwitchProps> = ({ children }) => {
    return <>{children}</>;
};
