import { redirect } from "react-router-dom";
import { useAuthLayoutOutletContext } from "../layout/AuthLayout";
import {
    AuthTokenType,
    getApiClient,
    TOKEN_OBTAIN_URL,
    updateAuthTokens,
} from "../utils/authutils";

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
            <input type="submit" value="Login" className={buttonClasses} />
        </>
    );
}

export default Login;

async function signInAction({ request }: { request: Request }) {
    const apiClient = getApiClient();
    const data = await request.formData();

    const response = await apiClient.post<AuthTokenType>(TOKEN_OBTAIN_URL, data);

    if (response.status !== 200) {
        alert("Invalid username or password");
        return redirect("/login");
    }

    updateAuthTokens(response.data);
    return redirect("/");
}

export { signInAction };
