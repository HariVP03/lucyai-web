import { GoogleButton } from "@/components";
import { useGoogleLogin } from "@/services/firebase/auth/useGoogleLogin";
import { useUser } from "@/services/recoil/hooks";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const [user] = useUser();

  const { googleSignin } = useGoogleLogin({
    onSuccess() {
      push("/chat");
    },
  });

  useEffect(() => {
    if (user) {
      push("/chat");
    }
  }, [user]);

  return (
    <Flex align="center" h="100vh" w="100vw" bg="white" flexDir="column">
      <Heading mt="128px" position="absolute" fontWeight="700">
        Welcome to LucyAI Prototype! 👋
      </Heading>

      <GoogleButton my="auto" onClick={googleSignin} />
    </Flex>
  );
}
