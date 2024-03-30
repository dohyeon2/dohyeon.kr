import classNames from "classnames";
import { PropsWithChildren, createElement } from "react";
import { Text } from "./Text";

interface TitleProps {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
}

export const Title: React.FC<PropsWithChildren<TitleProps>> = ({
    as = "h2",
    children,
    className,
}) => {
    return (
        <Text as={as} className={classNames("text-3xl font-bold", className)}>
            {children}
        </Text>
    );
};
