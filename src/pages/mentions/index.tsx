import { Layout } from "@/components";
import { auth } from "@/services/firebase/config";
import {
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import React, { useEffect } from "react";
import { createAxios } from "@/services/axios";

export default function Mentions({ users }: any) {
  useEffect(() => {
    if (auth.currentUser === null) {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Head>
        <title>LucyAI | Mentions</title>
      </Head>

      <Layout>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              You can use the following mentions while talking with LucyAI!
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Mention</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user: any, key: number) => (
                <Tr key={key}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Mention</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await createAxios().get("/company-users");

  return {
    props: {
      users: data,
    },
  };
}
