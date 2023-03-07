import axios, { AxiosInstance } from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

let axiosClient: AxiosInstance | null = null;

const BASE_URL = "http://localhost:8000/api/dashboard";

const TOKEN_OBTAIN_URL = `${BASE_URL}/accounts/token/`;

const TOKEN_REFRESH_URL = `${BASE_URL}/accounts/token/refresh/`;

const STORAGE_KEY = "tokens";

interface UserType {
    id: number;
    email: string;
    username: string;
    is_admin: boolean;
    creator: null | {
        id: number;
        username: string;
        email: string;
    };
}

let authTokens: AuthTokenType | null = null;

type AuthTokenType = {
    access: string;
    refresh: string;
};

type AccessTokenDecodedType = {
    token_type: "access";
    exp: string;
    iat: string;
    jti: string;
    user_id: number;
};

type RefreshTokenDecodedType = {
    token_type: "refresh";
    exp: string;
    iat: string;
    jti: string;
    user_id: number;
};

function getAuthTokens(): AuthTokenType | null {
    // Get Authentication tokens if they exist
    if (!authTokens) {
        const tkString = localStorage.getItem(STORAGE_KEY);
        if (tkString) {
            authTokens = JSON.parse(tkString);
        }
    }
    return authTokens;
}

function updateAuthTokens(tokens: AuthTokenType) {
    // Update authentication tokens
    const value = JSON.stringify(tokens);
    localStorage.setItem(STORAGE_KEY, value);
    authTokens = tokens;
}

function clearAuthTokens() {
    // Delete authentication tokens
    localStorage.removeItem(STORAGE_KEY);
    authTokens = null;
}

function getApiClient(): AxiosInstance {
    // Returns an axios api client. Returns an existing api client is one as already been created
    // else creates a new one and returns it.

    if (!axiosClient) {
        axiosClient = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
        addInterceptors(axiosClient);
    }

    return axiosClient;
}

let refreshingToken = false;
async function newAccessTokens(refresh: string): Promise<AuthTokenType | null> {
    // I have to access the new tokens this way because react router runs each loader in
    // paralell so when requesting for new tokens multiple request a fired at the same time
    // only the first request that reaches the server succeeds because the server blacklist the
    // refresh token so all other requests fail with a status of unauthorized by doing this am
    // forcing all other requests to wait for whoever first requests for new tokens and giving does
    // retrieved tokens to all the other request.

    // whoever gets here while a request for new tokens as to wait for the result
    while (refreshingToken) {
        // using a while loop without waiting a few seconds doesn't work
        // using a promise here for timer effect
        await new Promise((r) => {
            setTimeout(() => {
                r(null);
            }, 50);
        });

        if (!refreshingToken) {
            // return the access tokens that has already been set by previous request
            return getAuthTokens();
        }
    }

    refreshingToken = true;
    const response = await axios.post<AuthTokenType>(TOKEN_REFRESH_URL, {
        refresh: refresh,
    });
    if (response.status !== 200) {
        refreshingToken = false;
        clearAuthTokens();
        return null;
    }

    updateAuthTokens(response.data);
    refreshingToken = false;
    return response.data;
}

function addInterceptors(apiClient: AxiosInstance) {
    apiClient.interceptors.request.use(async (config) => {
        // The interceptor job is to check if user tokens exist or is till below the
        // expiry data before every request. In a case were access tokens are expired
        // request new tokens from the backend and set them before continueing with our
        // request.
        // The interceptor does nothing if the users don't have tokens or if refresh tokens expires,
        //so if a request returns a 401 unautherized response, then we can log the user out

        if (!authTokens) {
            // If the users don't have tokens do nothing
            return config;
        }
        const accessTokenDecoded = jwtDecode<AccessTokenDecodedType>(authTokens.access); // decode access tokens
        const isExpired = dayjs.unix(parseInt(accessTokenDecoded.exp)).diff(dayjs()) < 1; // check for expiration

        if (!isExpired) {
            // Access token is still valid so set header and return
            config.headers.Authorization = `Bearer ${authTokens.access}`;
            return config;
        }

        // request new access tokens
        const tokens = await newAccessTokens(authTokens.refresh);
        if (!tokens) {
            return config;
        }
        config.headers.Authorization = `Bearer ${tokens.access}`; // set authorization token

        return config;
    });
}

export type { AuthTokenType, AccessTokenDecodedType, RefreshTokenDecodedType, UserType };
export {
    getApiClient,
    getAuthTokens,
    BASE_URL,
    updateAuthTokens,
    clearAuthTokens,
    TOKEN_OBTAIN_URL,
    TOKEN_REFRESH_URL,
};
