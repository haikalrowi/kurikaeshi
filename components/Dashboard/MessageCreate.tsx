import { useChat } from "@/hooks/useChat";
import { messageGenerateResult } from "@/lib/action";
import { Textarea } from "@nextui-org/react";
import { SubmitButton } from "../ui/SubmitButton";

export function MessageCreate() {
  const { id: chatId } = useChat();
  return (
    <form action={messageGenerateResult}>
      <input type="hidden" name="chatId" defaultValue={chatId ?? undefined} />
      <div className="flex items-end gap-1">
        <Textarea name="request" />
        <SubmitButton>Send</SubmitButton>
      </div>
    </form>
  );
}
