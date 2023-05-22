import { Layout } from "@/components";
import { auth, db } from "@/services/firebase/config";
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
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { GetServerSideProps, GetStaticProps } from "next";

export default function Mentions() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    if (auth.currentUser === null) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    getDocs(collection(db, "/company-mentions")).then((querySnapshot) => {
      let final: any[] = [];
      querySnapshot.forEach((doc) => {
        final = [...final, { id: doc.id, ...doc.data() }];
      });

      setUsers(final);
    });
  }, [auth.currentUser]);

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
                <Th>Expertise</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user: any, key: number) => (
                <Tr key={key}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.expertise}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Mention</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Expertise</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const querySnapshot = await getDocs(collection(db, "/company-mentions"));

  let final: any[] = [];
  querySnapshot.forEach((doc) => {
    final = [...final, { id: doc.id, ...doc.data() }];
  });

  return {
    props: {
      users: final,
    },
    revalidate: 24 * 60 * 60,
  };
}
