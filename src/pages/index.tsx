import { GoogleButton } from "@/components";
import { useGoogleLogin } from "@/services/firebase/auth/useGoogleLogin";
import { auth } from "@/services/firebase/config";
import { Flex, Heading } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();

  const { googleSignin } = useGoogleLogin({
    onSuccess() {
      push("/chat");
    },
  });

  useEffect(() => {
    if (auth.currentUser) {
      push("/chat");
    }

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        push("/chat");
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>LucyAI | Login</title>
      </Head>

      <Flex align="center" h="100vh" w="100vw" bg="white" flexDir="column">
        <Heading mt="128px" position="absolute" fontWeight="700">
          Welcome to LucyAI Prototype! 👋
        </Heading>

        <GoogleButton my="auto" onClick={googleSignin} />
      </Flex>
    </>
  );
}
