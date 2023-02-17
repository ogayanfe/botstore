import { createTheme, ThemeProvider } from "@mui/material/styles";
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
    let themeSet = localStorage.getItem("isDark");
    if (!themeSet) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return localStorage.isDark === "true";
}

function ThemeContextProvider({ children }: Prop) {
    const [darkTheme, setDarkTheme] = useState(getDefaultDarkTheme());
    const muiDarkTheme = createTheme({
        palette: {
            mode: darkTheme ? "dark" : "light",
        },
    });
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

    return (
        <themeContext.Provider value={context}>
            <ThemeProvider theme={muiDarkTheme}>{children}</ThemeProvider>
        </themeContext.Provider>
    );
}

const useThemeContext = () => {
    return useContext(themeContext) as contextType;
};

export default ThemeContextProvider;
export { useThemeContext };
