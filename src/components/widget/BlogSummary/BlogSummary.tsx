import { Body, Title } from "@/components/typography";

interface BlogSummaryProps {}

export const BlogSummary: React.FC<BlogSummaryProps> = () => {
    return (
        <div className="flex flex-col gap-2">
            <Title>Judo Blog</Title>
            <Body>
                안녕하세요. Judo(주도현)의 블로그입니다.
                <br />
                개발에 대한 이야기를 중심으로 다양한 이야기를 나눕니다.
                <br />
                방문해주셔서 감사합니다.
            </Body>
        </div>
    );
};
