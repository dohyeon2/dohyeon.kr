import { PostEditor } from "@/components/post/edit/PostEditor";

export default function Page({
    searchParams: { id },
}: {
    searchParams: {
        id: string;
    };
}) {
    return <PostEditor id={id} />;
}
