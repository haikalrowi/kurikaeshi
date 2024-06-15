import { AppContext } from "@/context/App";
import { ChatContext } from "@/context/Chat";
import { useChat } from "@/hooks/useChat";
import { messageCreate } from "@/lib/action";
import { model } from "@/lib/googleAi";
import { Content } from "@google/generative-ai";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Textarea } from "@nextui-org/react";
import { useContext } from "react";
import { SubmitButton } from "../ui/SubmitButton";

export function MessageCreate() {
  const appContext = useContext(AppContext);
  const chatContext = useContext(ChatContext);
  const chatHook = useChat();
  const chat = appContext.User.Chat.find((chat) => chat.id === chatHook.id);
  const generateResult = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const request = formData.get("request") as string;
    chatContext[1]({
      pending: true,
      currentRequest: request,
      currentResponse: "",
    });
    const history = chat?.Message.flatMap((message) => [
      { role: "user", parts: [{ text: message.request }] } satisfies Content,
      { role: "model", parts: [{ text: message.response }] } satisfies Content,
    ]);
    const session = model.startChat({ history });
    const result = await session.sendMessageStream(request);
    let response = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      response += chunkText;
      chatContext[1]({
        pending: true,
        currentRequest: request,
        currentResponse: response,
      });
    }
    await messageCreate({
      chatId: chatHook.id ?? undefined,
      request,
      response,
    });
    chatContext[1](undefined);
  };
  return (
    <form onSubmit={generateResult}>
      <div className="flex items-end gap-6">
        <Textarea name="request" minRows={1} />
        <SubmitButton
          variant="light"
          isLoading={chatContext[0]?.pending}
          isIconOnly
        >
          <PaperAirplaneIcon />
        </SubmitButton>
      </div>
    </form>
  );
}
