import { Children, ReactElement } from "react";

interface SwitchProps {
    children: ReactElement<"Case"> | ReactElement<"Case">[];
}

export const Switch: React.FC<SwitchProps> = ({ children }) => {
    const returnedChild = Children.toArray(children).find((child) => {
        if (typeof child !== "object") return false;
        if ("props" in child === false) return false;
        if (child.props?.condition) {
            return child;
        }
    });

    return returnedChild ?? null;
};
