import { verify } from "jsonwebtoken";

export const verifyToken = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET in env is not defined");
    }

    return verify(token, process.env.JWT_SECRET);
};
