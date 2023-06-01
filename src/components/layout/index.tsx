import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu, FiSettings, FiUsers } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { SettingsModal } from "../settings-modal";
import { SidebarContent } from "./sidebar-content";
import { BiExit } from "react-icons/bi";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services";

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
  {
    title: "Settings",
    icon: FiSettings,
  },
  {
    title: "Logout",
    icon: BiExit,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const sidebar = useDisclosure();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        sidebar.onClose();

        window.location.href = "/";
      }
    });
  }, []);

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
        navItems={navItems}
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
          <SidebarContent navItems={navItems} w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: "72px",
        }}
        overflow="hidden"
        transition=".3s ease"
      >
        <Box as="main" h="calc(100vh)" overflow="hidden">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
