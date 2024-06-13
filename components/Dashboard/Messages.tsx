import { AppContext } from "@/context/App";
import { useChat } from "@/hooks/useChat";
import { useContext } from "react";

export function Messages() {
  const context = useContext(AppContext);
  const { id: chatId } = useChat();
  return (
    chatId &&
    context.User.Chat.find((chat) => chat.id === chatId)?.Message.map(
      (message) => (
        <div key={message.id}>
          <div>{message.request}</div>
          <div>{message.response}</div>
        </div>
      ),
    )
  );
}
