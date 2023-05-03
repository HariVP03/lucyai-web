import { GoogleButton } from "@/components";
import { useGoogleLogin } from "@/services/firebase/auth/useGoogleLogin";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  const { googleSignin, user } = useGoogleLogin({
    onSuccess() {
      push("/dashboard");
    },
  });

  return (
    <Flex align="center" h="100vh" w="100vw" bg="white" flexDir="column">
      <Heading mt="128px" position="absolute" fontWeight="700">
        Welcome to LucyAI Prototype! 👋
      </Heading>

      <GoogleButton my="auto" onClick={googleSignin} />
    </Flex>
  );
}
