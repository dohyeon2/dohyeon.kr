import { Nav, NavItem } from "@/components/ui/Nav";

interface AdminNavProps {}

export const AdminNav: React.FC<AdminNavProps> = () => {
    return (
        <div className="border-b">
            <Nav>
                <NavItem href="/admin/post/editor">글쓰기</NavItem>
            </Nav>
        </div>
    );
};
