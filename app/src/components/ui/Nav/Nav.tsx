import { PropsWithChildren } from "react";

interface NavProps {}

export const Nav: React.FC<PropsWithChildren> = ({ children }) => {
    return <nav>{children}</nav>;
};
