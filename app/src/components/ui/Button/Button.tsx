import classNames from "classnames";
import { HTMLProps, PropsWithChildren } from "react";

type HTMLButtonProps = HTMLProps<HTMLButtonElement>;

interface ButtonProps {
    onClick?: HTMLButtonProps["onClick"];
    className?: HTMLButtonProps["className"];
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    children,
    onClick,
    className,
}) => {
    return (
        <button
            className={classNames(
                "px-3 py-2 border hover:bg-white hover:text-black",
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
