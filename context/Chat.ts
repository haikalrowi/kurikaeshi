import { createContext, useState } from "react";

export type ChatContextState = {
  pending: boolean;
  currentRequest: string;
  currentResponse: string;
};
export type ChatContextType = ReturnType<typeof useState<ChatContextState>>;
export const ChatContext = createContext<ChatContextType>(
  {} as ChatContextType,
);
