import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
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

  const switchNeedCert = (id: string, needCert: boolean) =>
    updateDoc(doc(db, "bakeries", id), { needCert: !needCert });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bakeries"), (snapshot) =>
      setBakeries(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsubscribe;
  }, []);

  return (
    <Layout>
      <PageTitle title={"빵집"} />
      <h1>Bakery</h1>
      <ul>
        {bakeries.map((bakery) => (
          <li key={bakery.id}>
            <span
              style={
                bakery.needVisit
                  ? {}
                  : { opacity: 0.5, textDecoration: "line-through" }
              }
            >
              {bakery.area} - {bakery.name}
            </span>
            <button onClick={() => switchVisit(bakery.id, bakery.visited)}>
              방문{bakery.visited ? "⭕" : "❌"}
            </button>
            <button onClick={() => switchNeedCert(bakery.id, bakery.needCert)}>
              인수확인증필요{bakery.needCert ? "⭕" : "❌"}
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
