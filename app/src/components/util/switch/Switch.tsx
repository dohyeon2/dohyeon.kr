import { ReactElement } from "react";
import { Case } from "./Case";

interface SwitchProps {
    children: ReactElement<"Case"> | ReactElement<"Case">[];
}

export const Switch: React.FC<SwitchProps> = ({ children }) => {
    return <>{children}</>;
};
