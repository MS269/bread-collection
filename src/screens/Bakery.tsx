import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Area from "../components/bakery/Area";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { db } from "../firebase";

const Wrapper = styled.main``;

const AreaWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 6px 0px 30px 0px;
`;

const AreaContainer = styled.li``;

export default function Bakery() {
  const [bakeries, setBakeries] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "bakeries"), orderBy("area"), orderBy("visitOrder")),
      (snapshot) =>
        setBakeries(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return unsubscribe;
  }, []);

  return (
    <Wrapper>
      <PageTitle title={"빵집"} />
      <Header />
      <AreaWrapper>
        <AreaContainer>
          <Area
            area={"걸포동"}
            bakeries={bakeries.filter((bakery) => bakery.area === "걸포동")}
          />
        </AreaContainer>
        <AreaContainer>
          <Area
            area={"사우동"}
            bakeries={bakeries.filter((bakery) => bakery.area === "사우동")}
          />
        </AreaContainer>
        <AreaContainer>
          <Area
            area={"풍무동"}
            bakeries={bakeries.filter((bakery) => bakery.area === "풍무동")}
          />
        </AreaContainer>
        <AreaContainer>
          <Area
            area={"고촌읍"}
            bakeries={bakeries.filter((bakery) => bakery.area === "고촌읍")}
          />
        </AreaContainer>
        <AreaContainer>
          <Area
            area={"운양동"}
            bakeries={bakeries.filter((bakery) => bakery.area === "운양동")}
          />
        </AreaContainer>
        <AreaContainer>
          <Area
            area={"장기동"}
            bakeries={bakeries.filter((bakery) => bakery.area === "장기동")}
          />
        </AreaContainer>
        <AreaContainer>
          <Area
            area={"마산동"}
            bakeries={bakeries.filter((bakery) => bakery.area === "마산동")}
          />
        </AreaContainer>
        <AreaContainer>
          <Area
            area={"구래동"}
            bakeries={bakeries.filter((bakery) => bakery.area === "구래동")}
          />
        </AreaContainer>
      </AreaWrapper>
      <Footer />
    </Wrapper>
  );
}
