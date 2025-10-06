import { createContext } from "react";
import type { ThemeProviderContextValue } from "./ThemeProvider";

export const ThemeContext = createContext<ThemeProviderContextValue | undefined>(undefined);
