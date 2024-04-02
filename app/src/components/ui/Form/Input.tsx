import classNames from "classnames";
import { HTMLProps, useState } from "react";

interface InputProps {
    label?: HTMLProps<HTMLLabelElement>["children"];
    labelProps?: Omit<HTMLProps<HTMLLabelElement>, "children">;
    name: HTMLProps<HTMLInputElement>["name"];
    value: HTMLProps<HTMLInputElement>["value"] | null | undefined | boolean;
    onChange?: HTMLProps<HTMLInputElement>["onChange"];
    type?: HTMLProps<HTMLInputElement>["type"];
    className?: HTMLProps<HTMLInputElement>["className"];
    placeholder?: HTMLProps<HTMLInputElement>["placeholder"];
    withPasswordVisible?: boolean;
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
    withPasswordVisible = false,
}) => {
    const isPasswordType = type === "password";
    const [isVisible, setIsVisible] = useState(!isPasswordType);

    const isVisibleInPassword = isPasswordType && isVisible;
    const withVisibleButton = withPasswordVisible && isPasswordType;

    const toggleVisible = () => {
        setIsVisible(!isVisible);
    };

    return (
        <label
            {...labelProps}
            className={classNames("flex gap-2", labelProps.className)}
        >
            <span>{label}</span>
            <input
                className={classNames("border bg-transparent", className)}
                name={name}
                value={value ? String(value) : ""}
                type={isVisibleInPassword ? "text" : type}
                onChange={onChange}
                placeholder={placeholder}
            />
            {withVisibleButton && (
                <button className="text-sm" onClick={toggleVisible}>
                    비밀번호 보기
                </button>
            )}
        </label>
    );
};
