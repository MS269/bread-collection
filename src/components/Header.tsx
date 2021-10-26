import {
  faBreadSlice,
  faHome,
  faLock,
  faPaperPlane,
  faStickyNote,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../contexts/login";
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

export default function Header() {
  const location = useLocation();

  return (
    <SHeader>
      <Wrapper>
        <IconContainer>
          <Icon blur={location.pathname === routes.home}>
            <Link to={routes.home}>
              <Container>
                <FontAwesomeIcon icon={faHome} size="2x" />
                <span>홈</span>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
        <IconContainer>
          <Icon blur={location.pathname === routes.bakery}>
            <Link to={routes.bakery}>
              <Container>
                <FontAwesomeIcon icon={faBreadSlice} size="2x" />
                <span>빵집</span>
              </Container>
            </Link>
          </Icon>
          <Icon blur={location.pathname === routes.chat}>
            <Link to={routes.chat}>
              <Container>
                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                <span>채팅</span>
              </Container>
            </Link>
          </Icon>
          <Icon blur={location.pathname === routes.manual}>
            <Link to={routes.manual}>
              <Container>
                <FontAwesomeIcon icon={faStickyNote} size="2x" />
                <span>설명서</span>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
        <IconContainer>
          <Icon blur={location.pathname === routes.admin}>
            <Link to={routes.admin}>
              <Container>
                <LoginContext.Consumer>
                  {({ isLoggedIn }) => (
                    <FontAwesomeIcon
                      icon={isLoggedIn ? faUnlock : faLock}
                      size="2x"
                    />
                  )}
                </LoginContext.Consumer>
                <span>관리자</span>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
      </Wrapper>
    </SHeader>
  );
}
