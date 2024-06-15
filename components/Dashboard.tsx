"use client";

import { AppContext, AppContextType } from "@/context/App";
import { ChatContext, ChatContextState } from "@/context/Chat";
import { useScreen } from "@/hooks/useScreen";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { Menus } from "./Dashboard/Menus";
import { MessageCreate } from "./Dashboard/MessageCreate";
import { Messages } from "./Dashboard/Messages";

export function Dashboard(props: { appContext: AppContextType }) {
  const chatContext = useState<ChatContextState>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const screenHook = useScreen();
  const modalIsOpen = screenHook.width >= 640 ? false : isOpen;
  return (
    <AppContext.Provider value={props.appContext}>
      <ChatContext.Provider value={chatContext}>
        <div className="flex min-h-screen gap-2 max-sm:flex-col max-sm:p-2">
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
          <div className="sticky top-0 h-screen w-64 max-sm:hidden">
            <Menus />
          </div>
          <div className="flex flex-grow flex-col gap-4 sm:hidden">
            <Messages />
          </div>
          <div className="sticky bottom-2 sm:hidden">
            <MessageCreate />
          </div>
          <div className="flex flex-grow flex-col p-4 max-sm:hidden">
            <div className="container mx-auto flex max-w-prose flex-grow flex-col gap-4">
              <div className="flex flex-grow flex-col gap-4">
                <Messages />
              </div>
              <div className="sticky bottom-4">
                <MessageCreate />
              </div>
            </div>
          </div>
        </div>
      </ChatContext.Provider>
    </AppContext.Provider>
  );
}
