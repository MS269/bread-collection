import AddBakery from "../components/admin/AddBakery";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { Main } from "../components/sharedStyles";

export default function Admin() {
  return (
    <>
      <PageTitle title={"관리자"} />
      <Header />
      <Main>
        <AddBakery />
      </Main>
      <Footer />
    </>
  );
}
