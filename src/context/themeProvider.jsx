import { useState, createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function loadThemeFromStorage() {
    setTheme(localStorage.getItem("theme"));
    const themeValue = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", themeValue);
  }

  function toggleTheme() {
    setTheme(() => {
      const newTheme = theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });
  }

  useEffect(() => {
    loadThemeFromStorage();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
