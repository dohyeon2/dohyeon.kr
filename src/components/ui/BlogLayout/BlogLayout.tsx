import { PropsWithChildren } from "react";
import { Sidebar } from "../Sidebar";
import { Appbar } from "../Appbar";

interface BlogLayoutProps {}

export const BlogLayout: React.FC<PropsWithChildren<BlogLayoutProps>> = ({
    children,
}) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-none border-b sticky top-0">
                <Appbar />
            </div>
            <div className="flex flex-1">
                <div className="border-r flex-none">
                    <Sidebar />
                </div>
                <main className="flex-1">
                    <>{children}</>
                </main>
            </div>
        </div>
    );
};
