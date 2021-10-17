import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
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
    });
    setNewMessage("");
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chat"), (snapshot) =>
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsubscribe;
  }, []);

  return (
    <div>
      <PageTitle title={"채팅"} />
      <h1>Chat</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.author} - {message.payload}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="닉네임"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
        <input
          type="text"
          placeholder="메세지"
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}
