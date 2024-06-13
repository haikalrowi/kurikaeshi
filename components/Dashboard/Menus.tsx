import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  User,
} from "@nextui-org/react";

export function Menus() {
  const chats = new Array(1).fill(null);
  return (
    <Listbox
      aria-label="Menu"
      bottomContent={
        <div className="sticky bottom-1 flex flex-col bg-content1 md:mt-auto md:bg-background">
          <Button size="sm" variant="ghost" className="h-14 justify-start">
            <User
              name="kurikaeshi"
              description="kurikaeshi"
              avatarProps={{ src: "https://dummyjson.com/icon/kurikaeshi" }}
            />
          </Button>
        </div>
      }
      className="md:h-full"
      onAction={(key) => {}}
    >
      <ListboxItem key="newChat" showDivider>
        New chat
      </ListboxItem>
      <ListboxSection title="Chats">
        {chats.map((chat, index) => (
          <ListboxItem key={index} aria-label="Chat">
            Chat {index}
          </ListboxItem>
        ))}
      </ListboxSection>
    </Listbox>
  );
}
