import { FcGoogle } from "react-icons/fc";
import { Button, ButtonProps, Center, Text } from "@chakra-ui/react";

interface GoogleButtonProps extends ButtonProps {}

export function GoogleButton(props: GoogleButtonProps) {
  return (
    <Button variant={"outline"} leftIcon={<FcGoogle />} {...props}>
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
}
