import { ChevronUpIcon } from "lucide-react";
import React from "react";
import { useScroll } from "./hooks/useScroll";

interface Props {}

export const GoToUpButton: React.FC<Props> = (props) => {
    const scroll = useScroll();

    return (
        <button
            className="bg-blue-500 text-white p-2 rounded-full w-10 h-10 data-[visible=true]:opacity-100 data-[visible=false]:opacity-0 transition-opacity duration-300"
            data-visible={scroll > 100}
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }}
        >
            <ChevronUpIcon />
        </button>
    );
};
