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

export function Dashboard(props: { appContext: AppContextType }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { width } = useScreen();
  const modalIsOpen = width >= 640 ? false : isOpen;
  return (
    <AppContext.Provider value={props.appContext}>
      <div className="flex h-screen p-2 max-sm:flex-col">
        <div className="sticky top-2 z-50 sm:hidden">
          <Button onClick={onOpen} size="sm">
            Menu
          </Button>
          <Modal
            isOpen={modalIsOpen}
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
        <div className="h-full w-48 max-sm:hidden">
          <Menus />
        </div>
        <div className="flex flex-grow flex-col gap-4 pb-4 sm:hidden">
          <Messages />
        </div>
        <div className="sticky bottom-2 sm:hidden">
          <MessageCreate />
        </div>
        <div className="flex flex-grow flex-col overflow-y-scroll px-2 max-sm:hidden">
          <div className="container mx-auto flex max-w-prose flex-grow flex-col">
            <div className="flex flex-grow flex-col gap-4 pb-2">
              <Messages />
            </div>
            <div className="sticky bottom-0">
              <MessageCreate />
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
