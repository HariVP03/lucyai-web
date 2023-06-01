import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface NavItemsProps extends FlexProps {
  icon: any;
  route?: string;
  onClick?: () => void;
}

export function NavItem({
  icon,
  onClick,
  children,
  route,
  ...rest
}: NavItemsProps) {
  const { route: current, push } = useRouter();

  return (
    <Flex
      align="center"
      px="4"
      mx="2"
      rounded="md"
      py="3"
      bg={current === route ? "messenger.200" : "transparent"}
      cursor="pointer"
      _hover={{
        bg: "messenger.400",
      }}
      onClick={() => {
        route && push(route);
        onClick?.();
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && <Icon mx="auto" boxSize="4" as={icon} />}
    </Flex>
  );
}
