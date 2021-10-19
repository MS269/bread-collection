import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  opacity: 0.5;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 975px;
  width: 100%;
`;

const TeleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeleName = styled.span`
  margin-right: 5px;
`;

const TeleNum = styled.span`
  margin-left: 2px;
`;

const Dday = styled.div`
  margin-left: 20px;
  font-weight: 600;
`;

export default function Footer() {
  const dischargeDay: Date = new Date(2022, 10, 17);
  const today: Date = new Date();
  const dDay: number =
    Math.floor(
      (dischargeDay.getTime() - today.getTime()) / 1000 / 60 / 60 / 24
    ) + 1;

  return (
    <SFooter>
      <Wrapper>
        <TeleContainer>
          <TeleName>푸드뱅크</TeleName>
          <FontAwesomeIcon icon={faPhone} size="sm" />
          <TeleNum>031-983-1377</TeleNum>
        </TeleContainer>
        <Dday>소집해제 D-{dDay}</Dday>
      </Wrapper>
    </SFooter>
  );
}
