import { Layout } from "@/components";
import { auth } from "@/services/firebase/config";
import { Flex, Input, Button } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Dashboard() {
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          window.location.href = "/";
        }
      }),
    []
  );

  return (
    <>
      <Head>
        <title>LucyAI | Chat</title>
      </Head>

      <Layout>
        <Flex w="100%" maxH="calc(100vh - 96px)" overflow="scroll">
          <Flex w="full" h="100vh" mb="128px">
            Main area, this is where the chat will be
          </Flex>
        </Flex>

        <Flex
          py="32px"
          w="full"
          borderTopWidth="1px"
          borderColor="blackAlpha.300"
          bg="white"
          position="absolute"
          bottom="0px"
          left="0"
          right="0"
        >
          <Input
            placeholder="Try saying send an email to Mark about hiring interns or delegate tasks for this project to Mark, Robert and John"
            mx="4"
            my="auto"
          />

          <Button my="auto" mx="4">
            Send
          </Button>
        </Flex>
      </Layout>
    </>
  );
}
