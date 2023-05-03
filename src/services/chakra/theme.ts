import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const commonFont = "Poppins, sans-serif";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: commonFont,
  body: commonFont,
};

const colors = {
  brand: {
    100: "#1B1B1E",
  },
};

export const theme = extendTheme({ config, fonts, colors });
