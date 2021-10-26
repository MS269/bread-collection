import AddBakery from "../components/admin/AddBakery";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";

export default function Admin() {
  return (
    <Layout>
      <PageTitle title={"관리자"} />
      <AddBakery />
    </Layout>
  );
}
