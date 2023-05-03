import { Layout } from "@/components";
import { auth } from "@/services/firebase/config";
import { useUser } from "@/services/recoil/hooks";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import React, { useEffect } from "react";

export default function Dashboard() {
  const [user] = useUser();

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>LucyAI</title>
      </Head>

      <Layout>13</Layout>
    </>
  );
}
