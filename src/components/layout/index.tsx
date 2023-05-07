import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { FiMenu, FiUsers } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { auth } from "@/services/firebase/config";
import { useRouter } from "next/router";

const navItems = [
  {
    title: "Chat",
    icon: IoChatbubbleOutline,
    route: "/chat",
  },
  {
    title: "Mentions",
    icon: FiUsers,
    route: "/mentions",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const sidebar = useDisclosure();

  return (
    <Box
      as="section"
      overflow="hidden"
      _dark={{
        bg: "gray.700",
      }}
      maxH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="flex-end"
          w="full"
          px="4"
          py="10"
          overflow="hidden"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="96px"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          {/* <InputGroup
            w="96"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search for articles..." />
          </InputGroup> */}

          <Flex align="center">
            <Menu>
              <MenuButton
                as={Avatar}
                ml="4"
                size="md"
                name={auth.currentUser?.displayName ?? ""}
                src={auth.currentUser?.photoURL ?? ""}
                cursor="pointer"
              />
              <MenuList>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Contact Us</MenuItem>
                <MenuItem
                  onClick={() => {
                    auth.signOut();
                    window.location.href = "/";
                  }}
                >
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        <Box as="main" p="4" h="calc(100vh - 96px)" position="relative">
          {children}
        </Box>
      </Box>
    </Box>
  );
}

const NavItem = (props: { icon: any; children: string; route: string }) => {
  const { icon, children, route, ...rest } = props;
  const { route: current } = useRouter();

  console.log({ current, route });

  return (
    <Flex
      align="center"
      px="4"
      mx="2"
      rounded="md"
      as="a"
      href={route}
      py="3"
      bg={current === route ? "gray.100" : "transparent"}
      cursor="pointer"
      _hover={{
        bg: "gray.200",
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && <Icon mr="2" boxSize="4" as={icon} />}
      {children}
    </Flex>
  );
};

const SidebarContent = (props: any) => (
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
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Text fontSize="2xl" ml="2" fontWeight="bold">
        LucyAI
      </Text>
    </Flex>
    <Flex
      direction="column"
      as="nav"
      fontSize="sm"
      aria-label="Main Navigation"
    >
      {navItems.map((item, i) => (
        <NavItem route={item.route} key={i} icon={item.icon}>
          {item.title}
        </NavItem>
      ))}
      {/* <NavItem isSelected icon={IoChatbubbleOutline}>
        Chat
      </NavItem> */}
    </Flex>
  </Box>
);
