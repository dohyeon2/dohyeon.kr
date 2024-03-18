"use client";

import { api } from "@/lib/external/axios";
import { LoginForm } from "./LoginForm";
import { useRouter } from "next/navigation";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
    const router = useRouter();
    const onSubmit = async (data: { username: string; password: string }) => {
        await api.post("/api/auth/login", data);
        router.refresh();
    };

    return (
        <div className="p-4">
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};
