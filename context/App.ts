import { appContext } from "@/lib/action";
import { createContext } from "react";

export type AppContextType = Partial<Awaited<ReturnType<typeof appContext>>>;
export const AppContext = createContext<AppContextType>({});
