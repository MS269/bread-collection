import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { db } from "../firebase";

const BakeryContainer = styled.ul``;

const Bakery = styled.li``;

export default function Home() {
  const [bakeries, setBakeries] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "bakeries"), orderBy("area"), orderBy("visitOrder")),
      (snapshot) =>
        setBakeries(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsubscribe;
  }, []);

  return (
    <Layout>
      <PageTitle title={"홈"} />
      <BakeryContainer>
        {bakeries.map((bakery) => (
          <Bakery key={bakery.id}>
            {bakery.area} - {bakery.name}
          </Bakery>
        ))}
      </BakeryContainer>
    </Layout>
  );
}
