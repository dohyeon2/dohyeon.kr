"use client";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Form";
import MDEditor from "@/components/ui/MDEditor/MDEditor";
import { useForm } from "@/hooks/form/useForm";
import { api } from "@/lib/external/axios";
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

    const [content, setContent] = useState<string>("");

    const { mutateAsync: submit } = useMutation({
        mutationFn: async ({
            title,
            content,
        }: {
            title: string;
            content?: string;
        }) => {
            const { data } = await api.post("/api/post", {
                title,
                content,
            });

            return data;
        },
        onMutate(variables) {
            onSubmit?.(variables);
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
            <MDEditor
                value={content}
                onChange={(value = "") => {
                    setContent(value);
                }}
            />
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
