import { auth } from "@/services/firebase/config";
import { Message } from "@/types/messages";
import { Avatar, BackgroundProps, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ChatMessageProps extends Partial<Message> {}

export function ChatMessage(msg: ChatMessageProps) {
  const { sender } = msg;

  switch (sender) {
    case "user":
      return <RightMessage {...msg} />;
    case "system":
      return <SystemMessage {...msg} bg="aliceblue" />;
    case "bot":
      return <LeftMessage {...msg} />;
    default:
      return null;
  }
}

const Images = {
  user: "",
  bot: "https://api.dicebear.com/6.x/thumbs/svg?seed=Boots",
  system: "https://api.dicebear.com/6.x/bottts/svg?seed=Bandit",
};

interface LeftMessageProps extends ChatMessageProps {
  bg?: BackgroundProps["bg"];
}

interface SystemMessageProps extends ChatMessageProps {
  bg?: BackgroundProps["bg"];
}

function SystemMessage({ message, sender, sentAt, bg }: SystemMessageProps) {
  return (
    <Flex
      top="0"
      position="sticky"
      py="16px"
      align="center"
      gap="24px"
      bg={bg ?? "gray.100"}
      px="16px"
    >
      <Text w="full" textAlign="center" fontSize="xs" color="gray.500">
        {message}
      </Text>
    </Flex>
  );
}

function LeftMessage({ message, sender, bg, sentAt }: LeftMessageProps) {
  return (
    <Flex py="16px" align="center" gap="24px" bg={bg ?? "gray.100"} px="16px">
      <Photo src={Images[sender ?? "bot"]} />
      {message}
      <Text fontSize="xs" color="gray.500">
        {sentAt &&
          `${new Date(sentAt).getHours()}:${new Date(sentAt).getMinutes()}`}
      </Text>
    </Flex>
  );
}

function RightMessage({ message, sentAt }: LeftMessageProps) {
  return (
    <Flex
      py="16px"
      align="center"
      flexDirection="row-reverse"
      justify="flex-start"
      gap="24px"
      px="32px"
    >
      <Photo src={auth.currentUser?.photoURL ?? ""} />
      {message}
      <Text fontSize="xs" color="gray.500">
        {sentAt &&
          `${new Date(sentAt).getHours()}:${new Date(sentAt).getMinutes()}`}
      </Text>
    </Flex>
  );
}

interface PhotoProps {
  src: string;
}

function Photo({ src }: PhotoProps) {
  return <Avatar h="42px" w="42px" src={src} />;
}
