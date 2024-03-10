export default function Layout({
    children,
    login,
}: {
    children: React.ReactNode;
    login?: React.ReactNode;
}) {
    return <div>{children}</div>;
}
