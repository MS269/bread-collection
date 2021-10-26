import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function Messages() {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const deleteMessage = (id: string) => deleteDoc(doc(db, "chat", id));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chat"), orderBy("createdAt", "asc")),
      (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsubscribe;
  }, []);

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          <span>
            {message.author} - {message.payload}
          </span>
          <button onClick={() => deleteMessage(message.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
