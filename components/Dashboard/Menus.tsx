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
  Textarea,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { useContext } from "react";
import { SubmitButton } from "../ui/SubmitButton";

function UserMenu() {
  const context = useContext(AppContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="sticky bottom-1 flex flex-col bg-content1 sm:mt-auto sm:bg-background">
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>User</ModalHeader>
          <ModalBody>
            <Textarea
              defaultValue={JSON.stringify(context.User, undefined, 2)}
            />
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
}

export function Menus() {
  const context = useContext(AppContext);
  return (
    <Listbox
      aria-label="Menu"
      disabledKeys={["noChats"]}
      bottomContent={<UserMenu />}
      classNames={{
        base: "h-full flex-grow",
        list: "overflow-auto",
      }}
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
