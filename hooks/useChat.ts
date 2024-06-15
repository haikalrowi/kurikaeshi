import { useSearchParams } from "next/navigation";

export function useChat() {
  const searchParams = useSearchParams();
  return { id: searchParams.get("chatId") ?? undefined };
}
