import { PropsWithChildren } from "react";
import { Sidebar } from "../Sidebar";

interface BlogLayoutProps {}

export const BlogLayout: React.FC<PropsWithChildren<BlogLayoutProps>> = ({
    children,
}) => {
    return (
        <div className="flex h-full">
            <div className="border-r flex-none">
                <Sidebar />
            </div>
            <main className="flex-1">{children}</main>
        </div>
    );
};
