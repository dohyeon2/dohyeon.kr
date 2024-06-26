import { UserImpl } from "@/lib/internal/user/user.model";
import { sign } from "jsonwebtoken";
import "server-only";

export const generateAccessToken = (user: UserImpl) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET in env is not defined");
    }

    return sign(
        {
            sub: user.id,
        },
        process.env.JWT_SECRET!
    );
};
