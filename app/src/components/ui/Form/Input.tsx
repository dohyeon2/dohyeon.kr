import classNames from "classnames";
import { HTMLProps } from "react";

interface InputProps {
    label?: HTMLProps<HTMLLabelElement>["children"];
    labelProps?: Omit<HTMLProps<HTMLLabelElement>, "children">;
    name: HTMLProps<HTMLInputElement>["name"];
    value: HTMLProps<HTMLInputElement>["value"];
    onChange?: HTMLProps<HTMLInputElement>["onChange"];
    type?: HTMLProps<HTMLInputElement>["type"];
    className?: HTMLProps<HTMLInputElement>["className"];
    placeholder?: HTMLProps<HTMLInputElement>["placeholder"];
}

export const Input: React.FC<InputProps> = ({
    label = "",
    labelProps = {},
    name,
    value,
    onChange,
    className,
    type = "text",
    placeholder,
}) => {
    return (
        <label {...labelProps}>
            <span>{label}</span>
            <input
                className={classNames(
                    "border w-full bg-transparent",
                    className
                )}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
            />
        </label>
    );
};
