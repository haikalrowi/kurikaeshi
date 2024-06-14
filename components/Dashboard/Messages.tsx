import { AppContext } from "@/context/App";
import { useChat } from "@/hooks/useChat";
import { md } from "@/lib/markdownit";
import { Card, CardBody } from "@nextui-org/react";
import { useContext } from "react";

export function Messages() {
  const context = useContext(AppContext);
  const { id: chatId } = useChat();
  return (
    chatId &&
    context.User.Chat.find((chat) => chat.id === chatId)?.Message.map(
      (message) => {
        const markdown = md.render(message.response);
        return (
          <div key={message.id} className="flex flex-col gap-4">
            <Card classNames={{ base: "ml-16" }}>
              <CardBody>
                <p className="whitespace-pre-wrap">{message.request}</p>
              </CardBody>
            </Card>
            <Card
              classNames={{
                base: "mr-16",
                body: "prose whitespace-pre-wrap dark:prose-invert [&_*]:m-0",
              }}
            >
              <CardBody dangerouslySetInnerHTML={{ __html: markdown }} />
            </Card>
          </div>
        );
      },
    )
  );
}
