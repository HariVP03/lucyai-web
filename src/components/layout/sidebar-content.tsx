import { Avatar, Box, BoxProps, Flex, useDisclosure } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { NavItem } from "./nav-items";
import { auth } from "@/services";
import { SettingsModal } from "../settings-modal";

interface SidebarContentProps extends BoxProps {
  navItems: {
    title: string;
    icon: IconType;
    route?: string;
  }[];
}

export const SidebarContent = ({ navItems }: SidebarContentProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      bg="messenger.300"
    >
      <Flex height="calc(100% - 32px)" flexDir="column">
        <Flex px="4" py="5" align="center" gap="4px">
          <Avatar
            size="sm"
            src="https://api.dicebear.com/6.x/thumbs/svg?seed=Boots"
          />
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          aria-label="Main Navigation"
        >
          {navItems.map((item, i) => (
            <NavItem
              onClick={() => {
                if (item.title === "Logout") {
                  auth.signOut();
                }

                if (item.title === "Settings") {
                  onOpen();
                }
              }}
              route={item.route}
              key={i}
              icon={item.icon}
            />
          ))}
        </Flex>
      </Flex>
      <Flex mt="-32px" justify="center">
        <Avatar
          h="32px"
          w="32px"
          mt="32px"
          name={auth.currentUser?.displayName ?? ""}
          src={auth.currentUser?.photoURL ?? ""}
        />
      </Flex>

      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
