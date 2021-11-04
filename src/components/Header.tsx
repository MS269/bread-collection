import { collection, onSnapshot } from "@firebase/firestore";
import {
  faBreadSlice,
  faHome,
  faLock,
  faPaperPlane,
  faStickyNote,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  isLoggedInState,
  messageCountState,
  readMessageCountState,
} from "../atoms";
import { db } from "../firebase";
import routes from "../routes";

const SHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  padding: 18px 0px 10px 0px;
  border: solid 1px ${(props) => props.theme.borderColor};
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 975px;
  width: 100%;
`;

const IconContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.li<{ blur: boolean }>`
  margin: 0px 15px;
  opacity: ${(props) => (props.blur ? "0.5" : "1")};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  margin-top: 3px;
  font-size: 12px;
`;

const NotiContainer = styled(Container)`
  position: relative;
`;

const Noti = styled.div`
  position: absolute;
  top: -10px;
  left: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.red};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: 1;
  color: white;
`;

export default function Header() {
  const location = useLocation();

  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [messageCount, setMessageCount] = useRecoilState(messageCountState);
  const [readMessageCount, setReadMessageCount] = useRecoilState(
    readMessageCountState
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chat"), (snapshot) => {
      let count = 0;
      snapshot.docs.map(() => count++);
      if (location.pathname === routes.chat) {
        setReadMessageCount(count);
      }
      setMessageCount(count - readMessageCount);
    });
    return unsubscribe;
  });

  return (
    <SHeader>
      <Wrapper>
        <IconContainer>
          <Icon blur={location.pathname === routes.home}>
            <Link to={routes.home}>
              <Container>
                <FontAwesomeIcon icon={faHome} size="2x" />
                <Title>홈</Title>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
        <IconContainer>
          <Icon blur={location.pathname === routes.bakery}>
            <Link to={routes.bakery}>
              <Container>
                <FontAwesomeIcon icon={faBreadSlice} size="2x" />
                <Title>빵집</Title>
              </Container>
            </Link>
          </Icon>
          <Icon blur={location.pathname === routes.chat}>
            <Link to={routes.chat}>
              <NotiContainer>
                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                <Title>채팅</Title>
                {location.pathname !== routes.chat && messageCount > 0 ? (
                  <Noti>{messageCount}</Noti>
                ) : null}
              </NotiContainer>
            </Link>
          </Icon>
          <Icon blur={location.pathname === routes.manual}>
            <Link to={routes.manual}>
              <Container>
                <FontAwesomeIcon icon={faStickyNote} size="2x" />
                <Title>설명서</Title>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
        <IconContainer>
          <Icon blur={location.pathname === routes.admin}>
            <Link to={routes.admin}>
              <Container>
                <FontAwesomeIcon
                  icon={isLoggedIn ? faUnlock : faLock}
                  size="2x"
                />
                <Title>관리자</Title>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
      </Wrapper>
    </SHeader>
  );
}
