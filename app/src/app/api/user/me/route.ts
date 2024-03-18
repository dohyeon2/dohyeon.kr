import { getLoggedInUser } from "@/lib/internal/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const user = await getLoggedInUser();
    return NextResponse.json(user);
};
