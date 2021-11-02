import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../firebase";

const ChatContext = createContext({
  count: 0,
  setCount: (count: number) => {},
});

function ChatProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "chat"), where("read", "==", false)),
      (snapshot) => {
        let cnt = 0;
        snapshot.docs.map(() => cnt++);
        setCount(cnt);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <ChatContext.Provider value={{ count, setCount }}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };
