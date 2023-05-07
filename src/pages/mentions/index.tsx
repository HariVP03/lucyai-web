import { Layout } from "@/components";
import { auth } from "@/services/firebase/config";
import axios from "axios";
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

export default function Mentions({ users }: any) {
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          window.location.href = "/";
        }
      }),
    []
  );

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
              {/* <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td>0.91444</Td>
              </Tr> */}
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
  const { data } = await axios.get("http://localhost:3000/company-users");

  return {
    props: {
      users: data,
    },
  };
}
