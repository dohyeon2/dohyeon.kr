"use client";

import { Input } from "@/components/ui/Form";
import { useForm } from "@/hooks/form/useForm";

type InputState = {
    username: string;
    password: string;
};

interface LoginFormProps {
    onSubmit?: (data: InputState) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const { data, getInputProps } = useForm<InputState>({
        initialValue: {
            username: "",
            password: "",
        },
    });

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(data);
            }}
        >
            <Input label="아이디" type="text" {...getInputProps("username")} />
            <Input
                label="비밀번호"
                type="password"
                {...getInputProps("password")}
            />
            <button type="submit">Login</button>
        </form>
    );
};
