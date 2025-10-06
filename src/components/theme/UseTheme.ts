import { useContext } from "react";
import type { ThemeProviderContextValue } from "./ThemeProvider";
import { ThemeContext } from "./ThemeContext";

export const useTheme = (): ThemeProviderContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}