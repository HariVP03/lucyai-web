import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "@/services/chakra";
import { RecoilRoot } from "recoil";
import NextNProgress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://api.dicebear.com/6.x/thumbs/svg?seed=Boots"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <NextNProgress />
            <Component {...pageProps} />
          </ChakraProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
