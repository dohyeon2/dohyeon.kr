"use client";

import MDEditor from "@/components/form/MDEditor/MDEditor";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Form";
import { useForm } from "@/hooks/form/useForm";
import { Post } from "@/lib/internal/post/post.model";
import { useState } from "react";
import styled from "styled-components";

interface EditorProps {
    onSubmit?: (data: Post) => void;
    initialData?: Post;
}

export const Editor: React.FC<EditorProps> = ({
    onSubmit,
    initialData = new Post({
        title: "",
        content: "",
    }),
}) => {
    const { getInputProps, data } = useForm({
        initialValue: {
            title: initialData.title,
        },
    });

    const [content, setContent] = useState<string>(initialData.content);
    const [privatePost, setPrivatePost] = useState<boolean>(
        initialData.isPrivate ?? false
    );

    return (
        <div className="p-5 flex flex-col gap-4 h-full">
            <label>
                {privatePost ? "비공개" : "공개"}
                <input
                    type="checkbox"
                    name="private"
                    onChange={(e) => {
                        setPrivatePost(e.currentTarget.checked);
                    }}
                    checked={privatePost}
                />
            </label>
            <Input
                className="mx-auto block border-0 w-full text-2xl text-white"
                label="제목"
                placeholder="제목을 입력하세요."
                labelProps={{
                    className:
                        "mb-2 mx-auto block w-full flex-col gap-1 text-white/50",
                }}
                {...getInputProps("title")}
            />
            <EidtorStyle>
                <MDEditor
                    value={content}
                    tabSize={4}
                    onChange={(value = "") => {
                        setContent(value);
                    }}
                    height="100%"
                />
            </EidtorStyle>
            <Button
                className="w-full"
                onClick={() => {
                    onSubmit?.({
                        title: data.title,
                        content,
                        isPrivate: privatePost,
                    });
                }}
            >
                작성하기
            </Button>
        </div>
    );
};

const EidtorStyle = styled.div`
    flex: 1;
    .w-md-editor-toolbar {
        li > button {
            height: unset !important;
            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
    .w-md-editor-text-pre > code,
    .w-md-editor-text-input {
        font-size: 1.4rem !important;
        line-height: 1.6 !important;
    }
`;
