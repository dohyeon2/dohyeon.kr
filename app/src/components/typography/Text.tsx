import classNames from "classnames";
import { PropsWithChildren, createElement } from "react";

export interface TextProps {
    as: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
}

export const Text: React.FC<PropsWithChildren<TextProps>> = ({
    as,
    children,
    className,
}) => {
    return createElement(
        as,
        {
            className: classNames(className),
        },
        children
    );
};
