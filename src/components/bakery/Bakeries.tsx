import { doc, DocumentData, updateDoc } from "@firebase/firestore";
import styled from "styled-components";
import { db } from "../../firebase";

interface BakeriesProps {
  bakeries: DocumentData[];
}

const BakeryContainer = styled.ul``;

const Bakery = styled.ul`
  padding: 12px;
  margin: 15px 0px;
  background-color: ${(props) => props.theme.chatBgColor};
  border-radius: 22px;
  box-shadow: ${(props) => props.theme.shadow};
  text-align: center;
  cursor: pointer;
`;

const Name = styled.span<{ visited: boolean }>`
  text-decoration: ${(props) => (props.visited ? "line-through" : "inherit")};
  opacity: ${(props) => (props.visited ? "0.5" : "1")};
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
        </Bakery>
      ))}
    </BakeryContainer>
  );
}
