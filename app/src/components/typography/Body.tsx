import { PropsWithChildren } from "react";
import { Text, TextProps } from "./Text";

interface BodyProps {
    as?: TextProps["as"];
    className?: string;
}

export const Body: React.FC<PropsWithChildren<BodyProps>> = ({
    as = "p",
    children,
    className,
}) => {
    return (
        <Text as={as} className={className}>
            {children}
        </Text>
    );
};
