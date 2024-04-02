import { useState } from "react";

interface useFormArgs<T> {
    initialValue: T;
}

export const useForm = <T extends Record<string, string | boolean | number>>({
    initialValue,
}: useFormArgs<T>) => {
    const [data, setData] = useState<T>(initialValue);

    const onChange = <ET extends HTMLInputElement>(
        e: React.ChangeEvent<ET>
    ) => {
        if (e.target.type === "checkbox") {
            setData((prev) => ({
                ...prev,
                [e.target.name]: e.target.checked,
            }));
            return;
        }
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const getInputProps = (name: keyof T) => {
        return {
            name,
            value: data[name],
            onChange,
        };
    };

    return { data, getInputProps };
};
