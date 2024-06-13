"use client";

import { AppContext, AppContextType } from "@/context/App";
import { useScreen } from "@/hooks/useScreen";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Menus } from "./Dashboard/Menus";
import { MessageCreate } from "./Dashboard/MessageCreate";
import { Messages } from "./Dashboard/Messages";

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
  return (
    <div className="container mx-auto flex h-screen flex-col overflow-auto p-2 [scrollbar-width:thin]">
      <div className="flex-grow">
        <Messages />
      </div>
      <div className="sticky bottom-0">
        <MessageCreate />
      </div>
    </div>
  );
}

export function Dashboard(props: { appContext: AppContextType }) {
  return (
    <AppContext.Provider value={props.appContext}>
      <div className="md:flex">
        <Menu />
        <Main />
      </div>
    </AppContext.Provider>
  );
}
