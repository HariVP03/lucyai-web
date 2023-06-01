import { sendPrompt } from "@/api";
import { Layout } from "@/components";
import { ChatMessage } from "@/components/chat-message";
import { auth } from "@/services";
import { useStore } from "@/states";
import { Flex, Input, Button, useToast, Textarea } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Chat() {
  const [input, setInput] = useState<string>("");

  const { messages, addMessage, getMessages } = useStore((state) => state);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const errorToast = useToast({
    title: "An error occured",
    description: "Please try again later",
    status: "error",
  });

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (auth.currentUser === null) {
      window.location.href = "/";
    }
  }, []);

  const { isFetching: loading, refetch: fetch } = useQuery(
    "send-prompt",
    () => sendPrompt(input),
    {
      enabled: false,

      onSuccess(summary) {
        addMessage({
          sender: "bot",
          message: summary,
        });
      },

      onError() {
        errorToast();
      },
    }
  );

  function onSend() {
    if (input === "") return;

    addMessage({
      sender: "user",
      message: input,
    });

    fetch();

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
          maxH="calc(100vh - 120px)"
          flexDirection="column"
          position="relative"
          marginRight="-24px"
          overflow="scroll"
          marginBottom="96px"
        >
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}

          <div ref={bottomRef} />
        </Flex>

        <Flex
          py="32px"
          w="calc(100vw - 64px)"
          borderTopWidth="1px"
          borderColor="blackAlpha.300"
          position="fixed"
          bottom="0"
          bg="white"
          left="64px"
          right="0"
        >
          <Textarea
            placeholder="Try saying send an email to Mark about hiring interns or delegate tasks for this project to Mark, Robert and John"
            mx="4"
            my="auto"
            value={input}
            ref={inputRef}
            minHeight="42px"
            _expanded={{
              height: "fit-content",
            }}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            isLoading={loading}
            loadingText="Asking"
            onClick={onSend}
            isDisabled={input === ""}
            ref={buttonRef}
            px="4"
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
