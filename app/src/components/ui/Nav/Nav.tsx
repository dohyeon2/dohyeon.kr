import classNames from "classnames";
import { PropsWithChildren } from "react";

interface NavProps {
    className?: string;
}

export const Nav: React.FC<PropsWithChildren<NavProps>> = ({
    children,
    className,
}) => {
    return (
        <nav
            className={classNames(
                "flex",
                "[&_>_*]:border-r [&_>_*]:p-2",
                "hover:[&_>_*]:bg-white [&_>_*]:transition-all hover:[&_>_*]:text-black",
                className
            )}
        >
            {children}
        </nav>
    );
};
