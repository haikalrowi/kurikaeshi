import { AppContext } from "@/context/App";
import { useChat } from "@/hooks/useChat";
import { Card, CardBody } from "@nextui-org/react";
import { useContext } from "react";

export function Messages() {
  const context = useContext(AppContext);
  const { id: chatId } = useChat();
  return (
    chatId &&
    context.User.Chat.find((chat) => chat.id === chatId)?.Message.map(
      (message) => (
        <div key={message.id} className="flex flex-col gap-2">
          <Card classNames={{ base: "ml-16" }}>
            <CardBody>
              <p>{message.request}</p>
            </CardBody>
          </Card>
          <Card classNames={{ base: "mr-16" }}>
            <CardBody>
              <p>{message.response}</p>
            </CardBody>
          </Card>
        </div>
      ),
    )
  );
}
