import { AdminNav } from "@/components/widget/admin/AdminNav";
import { getLoggedInUser } from "@/lib/internal/auth";

export default async function Layout({
    children,
    login,
}: {
    children: React.ReactNode;
    login: React.ReactNode;
}) {
    const user = await getLoggedInUser();
    if (!user) {
        return <div>{login}</div>;
    }
    return (
        <div>
            <AdminNav />
            {children}
        </div>
    );
}
