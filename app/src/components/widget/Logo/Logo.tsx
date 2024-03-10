import { Title } from "@/components/typography";

interface LogoProps {}

export const Logo: React.FC<LogoProps> = () => {
    return (
        <div className="inline-block">
            <Title>Judo-log</Title>
        </div>
    );
};
