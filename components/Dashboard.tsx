"use client";

import { useScreen } from "@/hooks/useScreen";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Menus } from "./Dashboard/Menus";

function Menu() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { width } = useScreen();
  const mdWidth = 768;
  return (
    <>
      <div className="fixed right-2 top-2 md:hidden">
        <Button onClick={onOpen} size="sm">
          Menu
        </Button>
        <Modal
          isOpen={width && width >= mdWidth ? false : isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader>Menu</ModalHeader>
            <ModalBody>
              <Menus />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      <div className="h-screen basis-64 overflow-auto [scrollbar-width:thin] max-md:hidden">
        <Menus />
      </div>
    </>
  );
}

function Main() {
  const messages = new Array(100).fill(null);
  return (
    <div className="container mx-auto flex h-screen flex-col overflow-auto p-2 [scrollbar-width:thin]">
      <div className="flex-grow">
        {messages.map((message, index) => (
          <div key={index}>Message {index}</div>
        ))}
      </div>
      <form className="sticky bottom-0">
        <div className="flex items-end gap-1">
          <Textarea />
          <Button>Send</Button>
        </div>
      </form>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="md:flex">
      <Menu />
      <Main />
    </div>
  );
}
