import { auth } from "@/services/firebase/config";
import { Message } from "@/types/messages";
import { Avatar, BackgroundProps, Flex, Text, chakra } from "@chakra-ui/react";
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
      top="4px"
      position="sticky"
      py="8px"
      border="1px solid"
      borderColor="gainsboro"
      mx="auto"
      align="center"
      gap="24px"
      w="110px"
      rounded="full"
      bg={"white"}
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
    <Flex py="24px" align="center" gap="24px" px="16px">
      <Photo src={Images[sender ?? "bot"]} />
      <Flex
        bg="blue.50"
        color="blue.800"
        px="24px"
        rounded="3xl"
        py="12px"
        maxWidth="80%"
      >
        <Text fontSize="sm">
          {message?.includes("\n") ? (
            <>
              {message?.split("\n").map((line, i) => (
                <>
                  {line}{" "}
                  {i !== message?.split("\n").length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </>
              ))}
            </>
          ) : (
            message
          )}
        </Text>
      </Flex>

      <Text fontSize="xs" color="gray.500">
        {sentAt &&
          `${new Date(sentAt).toLocaleTimeString(undefined, {
            timeStyle: "short",
            hour12: false,
          })}`}
      </Text>
    </Flex>
  );
}

function RightMessage({ message, sentAt }: LeftMessageProps) {
  return (
    <Flex
      py="24px"
      align="center"
      flexDirection="row-reverse"
      justify="flex-start"
      gap="24px"
      px="32px"
    >
      <Photo src={auth.currentUser?.photoURL ?? ""} />
      <Flex
        color="green.800"
        bg="green.100"
        px="24px"
        rounded="3xl"
        py="16px"
        maxWidth="80%"
      >
        <Text fontSize="sm">{message}</Text>
      </Flex>
      <Text fontSize="xs" color="gray.500">
        {sentAt &&
          `${new Date(sentAt).toLocaleTimeString(undefined, {
            timeStyle: "short",
            hour12: false,
          })}`}
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
