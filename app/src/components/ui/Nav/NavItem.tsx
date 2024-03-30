"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface NavItemProps {
    className?: string;
    href?: string;
}

export const NavItem: React.FC<PropsWithChildren<NavItemProps>> = ({
    children,
    className,
    href,
}) => {
    const router = useRouter();
    const dataProps = { "data-href": href };

    return (
        <menu
            className={classNames(className, "data-[href]:cursor-pointer")}
            {...dataProps}
            onClick={(e) => {
                e.currentTarget.dataset.href &&
                    router.push(e.currentTarget.dataset.href);
            }}
        >
            {children}
        </menu>
    );
};
