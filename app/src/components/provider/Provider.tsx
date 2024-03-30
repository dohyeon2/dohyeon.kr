"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import StyledComponentsRegistry from "./StyledComponentsRegistry";

interface ProviderProps {}

export const queryClent = new QueryClient();

export const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({
    children,
}) => {
    return (
        <>
            <StyledComponentsRegistry>
                <QueryClientProvider client={queryClent}>
                    {children}
                </QueryClientProvider>
            </StyledComponentsRegistry>
        </>
    );
};
