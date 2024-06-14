import { useChat } from "@/hooks/useChat";
import { messageGenerateResult } from "@/lib/action";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Textarea } from "@nextui-org/react";
import { SubmitButton } from "../ui/SubmitButton";

export function MessageCreate() {
  const { id: chatId } = useChat();
  return (
    <form action={messageGenerateResult}>
      <input type="hidden" name="chatId" defaultValue={chatId ?? undefined} />
      <div className="flex items-end gap-6">
        <Textarea name="request" minRows={1} />
        <SubmitButton variant="light" isIconOnly>
          <PaperAirplaneIcon />
        </SubmitButton>
      </div>
    </form>
  );
}
