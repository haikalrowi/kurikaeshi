import { AppContext } from "@/context/App";
import { ChatContext } from "@/context/Chat";
import { useChat } from "@/hooks/useChat";
import { md } from "@/lib/markdownit";
import { Card, CardBody } from "@nextui-org/react";
import { useContext } from "react";

function MessageRequest(props: { request?: string }) {
  return (
    <Card classNames={{ base: "ml-16" }}>
      <CardBody>
        <p className="whitespace-pre-wrap">{props.request}</p>
      </CardBody>
    </Card>
  );
}

function MessageResponse(props: { response?: string }) {
  return (
    <Card
      classNames={{
        base: "mr-16",
        body: "prose whitespace-pre-wrap dark:prose-invert",
      }}
    >
      <CardBody
        dangerouslySetInnerHTML={{ __html: md.render(props.response ?? "") }}
      />
    </Card>
  );
}

export function Messages() {
  const appContext = useContext(AppContext);
  const chatContext = useContext(ChatContext);
  const chatHook = useChat();
  const chat = appContext.User.Chat.find((chat) => chat.id === chatHook.id);
  const currentMessage = chatContext[0] && {
    id: chatContext[1].name,
    request: chatContext[0].currentRequest,
    response: chatContext[0].currentResponse,
  };
  const messages = [...(chat?.Message ?? []), currentMessage];
  return messages.map(
    (message) =>
      message && (
        <div key={message.id} className="flex flex-col gap-4">
          <MessageRequest request={message.request} />
          <MessageResponse response={message.response} />
        </div>
      ),
  );
}
