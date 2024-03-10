import { BlogSummary } from "@/components/widget/BlogSummary";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <div className="p-4">
            <BlogSummary />
        </div>
    );
};
