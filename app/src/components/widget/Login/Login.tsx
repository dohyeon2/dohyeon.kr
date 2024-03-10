"use client";

import { axiosInstance } from "@/lib/external/axios";
import { LoginForm } from "./LoginForm";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
    const onSubmit = async (data: { username: string; password: string }) => {
        await axiosInstance.post("/api/auth/login", data);
    };

    return (
        <div className="p-4">
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
};
