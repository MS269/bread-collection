import React, { createContext, useState } from "react";

const ChatContext = createContext({
  count: 0,
  setCount: (value: number) => {},
});

function ChatProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <ChatContext.Provider value={{ count, setCount }}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };
