import { PostList } from "@/components/post/list";
import { PostLayout } from "@/components/ui/PostLayout/PostLayout";

export default function Home() {
    return (
        <PostLayout>
            <PostList />
        </PostLayout>
    );
}
