import { DocumentData } from "@firebase/firestore";
import styled from "styled-components";
import { Container } from "../sharedStyles";
import Bakeries from "./Bakeries";

interface AreaProps {
  area: string;
  bakeries: DocumentData[];
}

const SArea = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

export default function Area({ area, bakeries }: AreaProps) {
  return (
    <Container>
      <SArea>{area}</SArea>
      <Bakeries bakeries={bakeries} />
    </Container>
  );
}
