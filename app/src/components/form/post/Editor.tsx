"use client";

import { BlockEditor } from "@/components/ui/BlockEditor";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Form";
import { useForm } from "@/hooks/form/useForm";
import { axiosInstance } from "@/lib/external/axios";
import { Post } from "@/lib/internal/post/post.model";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface EditorProps {
    onSubmit?: (data: any) => void;
}

export const Editor: React.FC<EditorProps> = ({ onSubmit }) => {
    const { getInputProps, data } = useForm({
        initialValue: {
            title: "",
        },
    });

    const [content, setContent] = useState<EditorJS.OutputData>();

    const { mutateAsync: submit } = useMutation({
        mutationFn: async ({
            title,
            content,
        }: {
            title: string;
            content?: EditorJS.OutputData;
        }) => {
            const post = new Post({
                title,
                content,
            });

            const { data } = await axiosInstance.post("/api/post", post);

            return data;
        },
    });

    return (
        <div className="max-w-[650px] mx-auto p-5">
            <Input
                className="mx-auto block border-0"
                label="제목"
                placeholder="제목을 입력하세요."
                labelProps={{
                    className: "mb-2 mx-auto block",
                }}
                {...getInputProps("title")}
            />
            <BlockEditor onChange={setContent} />
            <Button
                className="w-full"
                onClick={async () => {
                    await submit({
                        title: data.title,
                        content,
                    });
                    globalThis.alert("작성되었습니다.");
                }}
            >
                작성하기
            </Button>
        </div>
    );
};
