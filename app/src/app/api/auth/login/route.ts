import { AUTH_CONSTS } from "@/consts/auth.consts";
import { UserImpl } from "@/lib/internal/user/user.model";
import { prisma } from "@/lib/external/prisma";
import { generateAccessToken } from "@/lib/internal/token";
import { compareSync } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const {
        username,
        password,
    }: {
        username: string;
        password: string;
    } = await req.json();

    const auth = await prisma.auth.findUnique({
        where: {
            username,
        },
    });

    const responseForInvalidUsernameOrPassword = NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
    );

    if (!auth) {
        return responseForInvalidUsernameOrPassword;
    }

    const passwordIsCorrect = compareSync(password, auth.password);

    if (!passwordIsCorrect) {
        return responseForInvalidUsernameOrPassword;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: auth.userId,
        },
    });

    if (!user) {
        return NextResponse.json(
            {
                message: "User not found",
            },
            { status: 500 }
        );
    }

    const accessToken = generateAccessToken(new UserImpl(user));

    const successFulLoginResponse = NextResponse.json({
        message: "Login successful",
    });

    successFulLoginResponse.cookies.set(
        AUTH_CONSTS.ACCESS_TOKEN_KEY,
        accessToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: AUTH_CONSTS.ACCESS_TOKEN_EXPIRATION_TIME,
        }
    );

    return successFulLoginResponse;
};
