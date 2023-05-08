import { Layout } from "@/components";
import { ChatMessage } from "@/components/chat-message";
import { createAxios } from "@/services/axios";
import { auth } from "@/services/firebase/config";
import { Message } from "@/types/messages";
import { Flex, Input, Button } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function Chat() {
  useEffect(() => {
    if (auth.currentUser === null) {
      window.location.href = "/";
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  function onSend() {
    if (input === "") return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: input,
      },
    ]);

    setLoading(true);

    createAxios()
      .post("/", {
        prompt: input,
      })
      .then(({ data }) => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            message: data.front,
          },
        ]);

        setLoading(false);
      });

    setInput("");
  }

  useEffect(() => {
    inputRef.current?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        buttonRef.current?.click();
      }
    });

    return () => {
      inputRef.current?.removeEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          buttonRef.current?.click();
        }
      });
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Head>
        <title>LucyAI | Chat</title>
      </Head>

      <Layout>
        <Flex
          w="100%"
          maxH="calc(100vh - 96px)"
          flexDirection="column"
          position="relative"
          marginRight="-24px"
          overflow="scroll"
          pt="96px"
          marginBottom="96px"
        >
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}

          <div ref={bottomRef} />
        </Flex>

        <Flex
          py="32px"
          w="calc(100vw - 256px)"
          borderTopWidth="1px"
          borderColor="blackAlpha.300"
          position="fixed"
          bottom="0"
          bg="white"
          left="256px"
          right="0"
        >
          <Input
            placeholder="Try saying send an email to Mark about hiring interns or delegate tasks for this project to Mark, Robert and John"
            mx="4"
            my="auto"
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            isLoading={loading}
            loadingText="Getting response..."
            onClick={onSend}
            isDisabled={input === ""}
            ref={buttonRef}
            my="auto"
            mx="4"
          >
            Ask
          </Button>
        </Flex>
      </Layout>
    </>
  );
}
