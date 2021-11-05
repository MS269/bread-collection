import { doc, DocumentData, updateDoc } from "@firebase/firestore";
import styled from "styled-components";
import { db } from "../../firebase";
import { Visited } from "../sharedStyles";

interface BakeriesProps {
  bakeries: DocumentData[];
}

const BakeryContainer = styled.ul``;

const Bakery = styled.ul`
  padding: 12px;
  margin: 15px 0px 0px 0px;
  background-color: ${(props) => props.theme.chatBgColor};
  border-radius: 22px;
  box-shadow: ${(props) => props.theme.shadow};
  text-align: center;
  cursor: pointer;
`;

const Name = styled(Visited)``;

// const CheckVisit = styled(Visited)`
// margin-top: 5px;
// `;

const Etc = styled(Visited)`
  margin-top: 5px;
`;

export default function Bakeries({ bakeries }: BakeriesProps) {
  const switchVisit = (id: string, visited: boolean) =>
    updateDoc(doc(db, "bakeries", id), { visited: !visited });

  return (
    <BakeryContainer>
      {bakeries.map((bakery) => (
        <Bakery
          key={bakery.id}
          onClick={() => switchVisit(bakery.id, bakery.visited)}
        >
          <Name visited={bakery.visited}>{bakery.name}</Name>
          {/* {bakery.checkVisit !== "" ? (
            <CheckVisit>{bakery.checkVisit}</CheckVisit>
          ) : null} */}
          {bakery.etc ? (
            <Etc visited={bakery.visited}>비고: {bakery.etc}</Etc>
          ) : null}
        </Bakery>
      ))}
    </BakeryContainer>
  );
}
