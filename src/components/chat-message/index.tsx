import { auth } from "@/services/firebase/config";
import { Message } from "@/types/messages";
import { Avatar, Flex } from "@chakra-ui/react";
import React from "react";

interface ChatMessageProps extends Message {}

export function ChatMessage({ message, sender }: ChatMessageProps) {
  switch (sender) {
    case "user":
      return <ChatMessageUser message={message} />;
    case "system":
      return <ChatMessageSystem message={message} />;
    case "bot":
      return <ChatMessageBot message={message} />;
    default:
      return null;
  }
}

function ChatMessageUser({ message }: Omit<ChatMessageProps, "sender">) {
  return (
    <Flex
      py="16px"
      align="center"
      flexDirection="row-reverse"
      justify="flex-start"
      gap="24px"
      px="32px"
    >
      <Avatar size="sm" src={auth.currentUser?.photoURL ?? ""} />
      {message}
    </Flex>
  );
}

function ChatMessageBot({ message }: Omit<ChatMessageProps, "sender">) {
  return (
    <Flex py="32px" align="center" gap="24px" bg="gray.100" px="16px">
      <Avatar
        size="sm"
        src="https://api.dicebear.com/6.x/thumbs/svg?seed=Boots"
      />
      {message}
    </Flex>
  );
}

function ChatMessageSystem({ message }: Omit<ChatMessageProps, "sender">) {
  return (
    <Flex px="32px" py="16px" align="center" gap="24px">
      <Avatar
        size="sm"
        src="https://api.dicebear.com/6.x/bottts/svg?seed=Bandit"
      />
      {message}
    </Flex>
  );
}
