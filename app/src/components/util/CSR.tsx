import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

interface CSRProps {}

export const CSR = dynamic(
    function _CSR() {
        return import("react").then((React) => {
            return function _Element({
                children,
            }: PropsWithChildren<CSRProps>) {
                return <>{children}</>;
            };
        });
    },
    { ssr: false }
);
