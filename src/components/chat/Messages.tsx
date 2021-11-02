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
import styled from "styled-components";
import { LoginContext } from "../../contexts/login";
import { db } from "../../firebase";

const MessageContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Message = styled.li<{ author: string }>`
  width: 100%;
  margin: 5px 0px;
  text-align: ${(props) => (props.author === "관리자" ? "right" : "left")};
`;

const Author = styled.div<{ author: string }>`
  margin: 0px 10px 2px 10px;
  opacity: 0.5;
  font-size: 12px;
`;

const Container = styled.div<{ author: string }>`
  display: flex;
  flex-direction: ${(props) =>
    props.author === "관리자" ? "row-reverse" : "row"};
  align-items: center;
`;

const Payload = styled.div`
  padding: 8px;
  margin: 0px 5px;
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 22px;
`;

const DeleteBtn = styled.div`
  margin: 0px 2px;
  font-size: 10px;
  cursor: pointer;
`;

const Time = styled.div`
  opacity: 0.5;
  font-size: 12px;
`;

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
    <MessageContainer>
      {messages.map((message) => (
        <Message key={message.id} author={message.author}>
          <Author author={message.author}>{message.author}</Author>
          <Container author={message.author}>
            <Payload>{message.payload}</Payload>
            <Time>{message.createdAt}</Time>
            <LoginContext.Consumer>
              {({ isLoggedIn }) =>
                isLoggedIn ? (
                  <DeleteBtn onClick={() => deleteMessage(message.id)}>
                    ❌
                  </DeleteBtn>
                ) : null
              }
            </LoginContext.Consumer>
          </Container>
        </Message>
      ))}
    </MessageContainer>
  );
}
