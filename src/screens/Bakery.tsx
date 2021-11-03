import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { db } from "../firebase";

export default function Bakery() {
  const [bakeries, setBakeries] = useState<DocumentData[]>([]);

  const switchVisit = (id: string, visited: boolean) =>
    updateDoc(doc(db, "bakeries", id), { visited: !visited });

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
      <PageTitle title={"빵집"} />
      <ul>
        {bakeries.map((bakery) => (
          <li key={bakery.id}>
            <span
              style={
                bakery.visited
                  ? { opacity: 0.5, textDecoration: "line-through" }
                  : {}
              }
            >
              {bakery.area} - {bakery.name}
            </span>
            <button onClick={() => switchVisit(bakery.id, bakery.visited)}>
              방문{bakery.visited ? "⭕" : "❌"}
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
