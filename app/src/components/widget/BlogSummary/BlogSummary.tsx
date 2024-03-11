import { Body, Title } from "@/components/typography";
import Link from "next/link";

interface BlogSummaryProps {}

export const BlogSummary: React.FC<BlogSummaryProps> = () => {
    return (
        <div className="flex flex-col gap-2">
            <Link href="/">
                <Title>Judo Blog</Title>
            </Link>
            <Body>
                안녕하세요.
                <br />
                개발자 Judo, 주도현입니다.
                <br />
                개발에 대한 이야기를 중심으로 다양한 이야기를 나눕니다.
                <br />
                방문해주셔서 감사합니다.
            </Body>
        </div>
    );
};
