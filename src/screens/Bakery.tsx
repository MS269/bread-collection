import { collection, DocumentData, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { db } from "../firebase";

export default function Bakery() {
  const [bakeries, setBakeries] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bakeries"), (snapshot) =>
      setBakeries(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsubscribe;
  }, []);

  return (
    <div>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
