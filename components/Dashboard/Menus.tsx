import { AppContext } from "@/context/App";
import { logout } from "@/lib/action/user";
import {
  Button,
  Input,
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

function UserMenu() {
  const context = useContext(AppContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="sticky bottom-1 flex flex-col sm:mt-auto">
      <Button
        size="sm"
        variant="flat"
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
            <form>
              <div className="flex flex-col gap-2">
                <Input
                  label="Name"
                  value={context.User.name}
                  isReadOnly
                  labelPlacement="outside-left"
                  classNames={{ label: "w-16" }}
                />
                <Input
                  label="Email"
                  value={context.User.email}
                  isReadOnly
                  labelPlacement="outside-left"
                  classNames={{ label: "w-16" }}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <form action={logout}>
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
      aria-label="menus"
      disabledKeys={["no-chats"]}
      selectionMode="single"
      bottomContent={<UserMenu />}
      classNames={{
        base: "h-full flex-grow",
        list: "overflow-auto",
      }}
    >
      <ListboxItem key="new-chat" showDivider variant="flat" href="/app">
        New chat
      </ListboxItem>
      <ListboxSection title="Chats">
        {context.User.Chat.length === 0 ? (
          <ListboxItem key={"no-chats"}>No chats</ListboxItem>
        ) : (
          context.User.Chat.map((chat) => (
            <ListboxItem
              key={chat.id}
              variant="flat"
              href={`/app?chatId=${chat.id}`}
            >
              {chat.label}
            </ListboxItem>
          ))
        )}
      </ListboxSection>
    </Listbox>
  );
}
