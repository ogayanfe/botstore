import { createContext, useContext } from "react";
import { getAuthTokens } from "../utils/authutils";

type Props = {
    children: React.ReactNode;
};

const userContext = createContext({});

type AuthContextValueType = {
    isAuthenticated: boolean;
};

function AuthContextProvider({ children }: Props) {
    const context: AuthContextValueType = {
        isAuthenticated: Boolean(getAuthTokens()),
    };

    return <userContext.Provider value={context}>{children}</userContext.Provider>;
}

const useAuthContext = () => {
    return useContext(userContext) as AuthContextValueType;
};

export default AuthContextProvider;

export { useAuthContext, userContext };
