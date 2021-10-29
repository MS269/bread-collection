import styled from "styled-components";
import Messages from "../components/chat/Messages";
import SendMessage from "../components/chat/SendMessage";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export default function Chat() {
  return (
    <Layout>
      <PageTitle title={"채팅"} />
      <Wrapper>
        <Messages />
        <SendMessage />
      </Wrapper>
    </Layout>
  );
}
