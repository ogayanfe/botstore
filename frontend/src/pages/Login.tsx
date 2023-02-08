import { useAuthLayoutOutletContext } from "../layout/AuthLayout";

function Login() {
    const { labelClasses, inputClasses, buttonClasses } = useAuthLayoutOutletContext();
    return (
        <>
            <label htmlFor="login__username" className={labelClasses}>
                Username
            </label>
            <input type="text" name="username" id="login__username" className={inputClasses} />
            <label htmlFor="login__password" className={labelClasses}>
                Password
            </label>
            <input type="password" name="password" id="login__password" className={inputClasses} />
            <input type="button" value="Login" className={buttonClasses} />
        </>
    );
}

export default Login;
