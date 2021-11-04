import { DocumentData } from "@firebase/firestore";
import styled from "styled-components";
import Bakeries from "./Bakeries";

interface AreaProps {
  area: string;
  bakeries: DocumentData[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  max-width: 935px;
  width: 100%;
  margin: 24px auto 0px auto;
  padding: 16px;
  border: solid 1px ${(props) => props.theme.borderColor};
`;

const SArea = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export default function Area({ area, bakeries }: AreaProps) {
  return (
    <Container>
      <SArea>{area}</SArea>
      <Bakeries bakeries={bakeries} />
    </Container>
  );
}
