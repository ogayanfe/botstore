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
            <label htmlFor="login__email" className={labelClasses}>
                Username
            </label>
            <input type="text" name="email" id="login__email" className={inputClasses} />
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

    try {
        const response = await apiClient.post<AuthTokenType>(TOKEN_OBTAIN_URL, data);

        if (response.status !== 200) {
            alert("Invalid username or password");
            return redirect("/login");
        }

        updateAuthTokens(response.data);
        return redirect("/");
    } catch (e) {
        alert("Invalid username or password");
        redirect("/login");
    }
    return null;
}

export { signInAction };
