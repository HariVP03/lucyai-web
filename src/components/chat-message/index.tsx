import { auth } from "@/services/firebase/config";
import { Message } from "@/types/messages";
import { Avatar, BackgroundProps, Flex } from "@chakra-ui/react";
import React from "react";

interface ChatMessageProps extends Partial<Message> {}

export function ChatMessage({ message, sender }: ChatMessageProps) {
  switch (sender) {
    case "user":
      return <RightMessage sender={sender} message={message} />;
    case "system":
      return <LeftMessage sender={sender} message={message} bg="aliceblue" />;
    case "bot":
      return <LeftMessage sender={sender} message={message} />;
    default:
      return null;
  }
}

const Images = {
  user: auth.currentUser?.photoURL ?? "",
  bot: "https://api.dicebear.com/6.x/thumbs/svg?seed=Boots",
  system: "https://api.dicebear.com/6.x/bottts/svg?seed=Bandit",
};

interface LeftMessageProps extends ChatMessageProps {
  bg?: BackgroundProps["bg"];
}

function LeftMessage({ message, sender, bg }: LeftMessageProps) {
  return (
    <Flex py="16px" align="center" gap="24px" bg={bg ?? "gray.100"} px="16px">
      <Photo src={Images[sender ?? "bot"]} />
      {message}
    </Flex>
  );
}

function RightMessage({ message, sender }: LeftMessageProps) {
  return (
    <Flex
      py="16px"
      align="center"
      flexDirection="row-reverse"
      justify="flex-start"
      gap="24px"
      px="32px"
    >
      <Photo src={Images[sender ?? "user"]} />
      {message}
    </Flex>
  );
}

interface PhotoProps {
  src: string;
}

function Photo({ src }: PhotoProps) {
  return <Avatar h="42px" w="42px" src={src} />;
}
