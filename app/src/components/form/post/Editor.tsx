"use client";

import { BlockEditor } from "@/components/ui/BlockEditor";
import { Input } from "@/components/ui/Form";
import { useForm } from "@/hooks/form/useForm";
import { useState } from "react";

interface EditorProps {}

export const Editor: React.FC<EditorProps> = () => {
    const { getInputProps, data } = useForm({
        initialValue: {
            title: "",
        },
    });

    const [content, setContent] = useState<EditorJS.OutputData>();

    return (
        <div>
            <Input
                className="max-w-[650px] mx-auto block border-0"
                label="제목"
                placeholder="제목을 입력하세요."
                labelProps={{
                    className: "mb-2 mx-auto max-w-[650px] block",
                }}
                {...getInputProps("title")}
            />
            <BlockEditor onChange={setContent} />
        </div>
    );
};
