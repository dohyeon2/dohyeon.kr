import { PostList } from "@/components/list/post";
import { PostLayout } from "@/components/ui/PostLayout/PostLayout";

export default function Home() {
    return (
        <PostLayout>
            <PostList />
        </PostLayout>
    );
}
