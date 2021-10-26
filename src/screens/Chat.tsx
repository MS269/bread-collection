import Messages from "../components/chat/Messages";
import SendMessage from "../components/chat/SendMessage";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";

export default function Chat() {
  return (
    <Layout>
      <PageTitle title={"채팅"} />
      <Messages />
      <SendMessage />
    </Layout>
  );
}
