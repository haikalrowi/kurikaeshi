import { context } from "@/lib/action/app";
import { createContext } from "react";

export type AppContextType = Awaited<ReturnType<typeof context>>;
export const AppContext = createContext<AppContextType>({} as AppContextType);
