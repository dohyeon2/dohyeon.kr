interface LoginFormProps {
    onSubmit?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    return (
        <form
            onSubmit={() => {
                onSubmit?.();
            }}
        >
            <input name="username" type="text" />
            <input name="password" type="password" />
            <button type="submit">Login</button>
        </form>
    );
};
