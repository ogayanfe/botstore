import { createContext, useContext } from "react";
import { getApiClient, getAuthTokens } from "../utils/authutils";
import { useState, useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

const userContext = createContext({});

type AuthContextValueType = {
    isAuthenticated: boolean;
    profileData: ProfileData | null;
    setProfileData: (p: ProfileData) => void;
};

type ProfileData = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
};

function AuthContextProvider({ children }: Props) {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const context: AuthContextValueType = {
        isAuthenticated: Boolean(getAuthTokens()),
        profileData: profileData,
        setProfileData: setProfileData,
    };
    console.log(profileData);
    return <userContext.Provider value={context}>{children}</userContext.Provider>;
}

const useAuthContext = () => {
    return useContext(userContext) as AuthContextValueType;
};

export default AuthContextProvider;

export type { ProfileData };
export { useAuthContext, userContext };
