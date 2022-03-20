import React, { useEffect, useState } from 'react';
import ThemeContext from '.';

const ThemeProvider = ({ children }) => {
    const getTheme = () => localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(getTheme);

    const toggleTheme = () => {
        var html = document.querySelector("html");
        const theme = getTheme();
        localStorage.setItem("theme", theme === "light" ? "dark" : "light");
        if(theme === "light") {
            setTheme("dark");
            html.classList.add("dark");
        } else {
            setTheme("light");
            html.classList.remove("dark");
        }
    }

    useEffect(() => {
        var html = document.querySelector("html");
        let theme = getTheme();
        if(theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;