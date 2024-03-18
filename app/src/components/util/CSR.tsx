import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

interface CSRProps {}

export const CSR = dynamic(
    () => {
        return import("react").then((React) => {
            return ({ children }: PropsWithChildren<CSRProps>) => {
                return <>{children}</>;
            };
        });
    },
    { ssr: false }
);
