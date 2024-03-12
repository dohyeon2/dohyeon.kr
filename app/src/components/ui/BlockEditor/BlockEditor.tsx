import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import styled from "styled-components";
// @ts-ignore
import ImageTool from "@editorjs/image";
// @ts-ignore
import Header from "@editorjs/header";

interface BlockEditorProps {
    onChange?: (data: any) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({
    onChange = console.log,
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<EditorJS | null>(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        const element = editorRef.current;
        if (!element) return;
        const editor = new EditorJS({
            holder: element,
            autofocus: true,
            placeholder: "내용을 입력하세요.",
            onChange: (api) => {
                api.saver.save().then((outputData) => {
                    onChange(outputData);
                });
            },
            tools: {
                image: {
                    class: ImageTool,
                    inlineToolbar: true,
                },
                header: {
                    class: Header,
                    inlineToolbar: true,
                },
            },
        });
        initialized.current = true;
        editor.isReady.then(() => {
            instanceRef.current = editor;
        });

        return () => {
            const instance = instanceRef.current;
            if (!instance) return;
            instance.destroy();
        };
    }, [onChange]);

    return <StyledEditorHolder ref={editorRef} />;
};

const StyledEditorHolder = styled.div``;
