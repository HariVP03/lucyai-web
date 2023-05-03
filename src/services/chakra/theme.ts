import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const commonFont = "Oxygen, sans-serif";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: commonFont,
  body: commonFont,
};

export const theme = extendTheme({ config, fonts });
