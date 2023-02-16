import { createContext, useContext } from "react";
import { getAuthTokens, UserType } from "../utils/authutils";
import { useState } from "react";

type Props = {
    children: React.ReactNode;
};

const userContext = createContext({});

type AuthContextValueType = {
    isAuthenticated: boolean;
    profileData: ProfileData | null;
    setProfileData: (p: ProfileData) => void;
};

interface ProfileData extends UserType {}

function AuthContextProvider({ children }: Props) {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const context: AuthContextValueType = {
        isAuthenticated: Boolean(getAuthTokens()),
        profileData: profileData,
        setProfileData: setProfileData,
    };
    return <userContext.Provider value={context}>{children}</userContext.Provider>;
}

const useAuthContext = () => {
    return useContext(userContext) as AuthContextValueType;
};

export default AuthContextProvider;

export type { ProfileData };
export { useAuthContext, userContext };
