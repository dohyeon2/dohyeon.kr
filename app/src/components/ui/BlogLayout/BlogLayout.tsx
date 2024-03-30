import { PropsWithChildren } from "react";
import { Sidebar } from "../Sidebar";

interface BlogLayoutProps {}

export const BlogLayout: React.FC<PropsWithChildren<BlogLayoutProps>> = ({
    children,
}) => {
    return (
        <div className="flex h-full overflow-y-auto">
            <div className="border-r flex-none sticky top-0">
                <Sidebar />
            </div>
            <main className="flex-1">{children}</main>
        </div>
    );
};
