import { PropsWithChildren } from "react";

interface PostLayoutProps {}

export const PostLayout: React.FC<PropsWithChildren<PostLayoutProps>> = ({
    children,
}) => {
    return <div className="p-5">{children}</div>;
};
