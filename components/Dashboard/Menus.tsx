import { AppContext } from "@/context/App";
import { userLogout } from "@/lib/action";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { useContext } from "react";
import { SubmitButton } from "../ui/SubmitButton";

export function Menus() {
  const context = useContext(AppContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const bottomMenu = (
    <div className="sticky bottom-1 flex flex-col bg-content1 md:mt-auto md:bg-background">
      <Button
        size="sm"
        variant="ghost"
        className="h-14 justify-start"
        onClick={onOpen}
      >
        <User
          name={context.User.name}
          description={context.User.email}
          avatarProps={{
            src: `https://dummyjson.com/icon/${context.User.id}`,
          }}
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>User</ModalHeader>
          <ModalBody>
            <pre>{JSON.stringify(context.User, undefined, 2)}</pre>
          </ModalBody>
          <ModalFooter>
            <form action={userLogout}>
              <SubmitButton>Logout</SubmitButton>
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
  return (
    <Listbox
      aria-label="Menu"
      disabledKeys={["noChats"]}
      bottomContent={bottomMenu}
      className="md:h-full"
      onAction={(key) => {}}
    >
      <ListboxItem key="newChat" showDivider href="/app">
        New chat
      </ListboxItem>
      <ListboxSection title="Chats">
        {context.User.Chat.length === 0 ? (
          <ListboxItem key={"noChats"}>No chats</ListboxItem>
        ) : (
          context.User.Chat.map((chat) => (
            <ListboxItem key={chat.id} href={`/app?chatId=${chat.id}`}>
              {chat.label}
            </ListboxItem>
          ))
        )}
      </ListboxSection>
    </Listbox>
  );
}
