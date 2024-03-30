import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { BlogLayout } from "@/components/ui/BlogLayout";
import { Provider } from "@/components/provider";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Judo Blog",
    description: `안녕하세요.
    개발자 Judo, 주도현입니다.
    개발에 대한 이야기를 중심으로 다양한 이야기를 나눕니다.
    방문해주셔서 감사합니다.`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={notoSans.className}>
                <Provider>
                    <BlogLayout>{children}</BlogLayout>
                </Provider>
            </body>
        </html>
    );
}
