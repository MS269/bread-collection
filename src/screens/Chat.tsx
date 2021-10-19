import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { db } from "../firebase";

export default function Chat() {
  const [newAuthor, setNewAuthor] = useState("봉사자");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const sendMessage = () => {
    addDoc(collection(db, "chat"), {
      author: newAuthor,
      payload: newMessage,
      createdAt: Date.now(),
    });
    setNewMessage("");
  };

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
    <Layout>
      <PageTitle title={"채팅"} />
      <h1>Chat</h1>
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
      <div>
        <input
          type="text"
          placeholder="닉네임"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="메세지"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          required
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </Layout>
  );
}
