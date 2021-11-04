import { DocumentData } from "@firebase/firestore";
import { Container, Title } from "../sharedStyles";
import Bakeries from "./Bakeries";

interface AreaProps {
  area: string;
  bakeries: DocumentData[];
}

export default function Area({ area, bakeries }: AreaProps) {
  return (
    <Container>
      <Title>{area}</Title>
      <Bakeries bakeries={bakeries} />
    </Container>
  );
}
