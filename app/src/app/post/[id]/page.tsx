import { PostLayout } from "@/components/ui/PostLayout/PostLayout";
import { PostView } from "@/components/view/post/PostView";
import { Suspense } from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
    return (
        <PostLayout>
            <Suspense fallback={<p>Loading feed...</p>}>
                <PostView id={id} />
            </Suspense>
        </PostLayout>
    );
}
