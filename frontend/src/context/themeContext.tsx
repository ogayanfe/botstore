import { createContext, useContext, useState, useEffect } from "react";

type Prop = {
    children: React.ReactNode;
};

type contextType = {
    darkTheme: boolean;
    setDarkTheme: (t: boolean) => void;
};

const themeContext = createContext({});

function getDefaultDarkTheme(): boolean {
    if (
        localStorage.isDark === "true" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        return true;
    }
    return false;
}

function ThemeContextProvider({ children }: Prop) {
    const [darkTheme, setDarkTheme] = useState(getDefaultDarkTheme());

    const context = {
        setDarkTheme: setDarkTheme,
        darkTheme: darkTheme,
    };

    useEffect(() => {
        localStorage.setItem("isDark", JSON.stringify(darkTheme));
        if (darkTheme) {
            document.documentElement.classList.add("dark");
            return;
        }
        document.documentElement.classList.remove("dark");
    }, [darkTheme]);

    return <themeContext.Provider value={context}>{children}</themeContext.Provider>;
}

const useThemeContext = () => {
    return useContext(themeContext) as contextType;
};

export default ThemeContextProvider;
export { useThemeContext };
