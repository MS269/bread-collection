import {
  faBreadSlice,
  faHome,
  faLock,
  faPaperPlane,
  faStickyNote,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

const Icon = styled.li`
  margin: 0px 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Header() {
  const isLoggedIn = false;

  return (
    <SHeader>
      <Wrapper>
        <IconContainer>
          <Icon>
            <Link to={routes.home}>
              <Container>
                <FontAwesomeIcon icon={faHome} size="2x" />
                <span>홈</span>
              </Container>
            </Link>
          </Icon>
          <Icon>
            <Link to={routes.bakery}>
              <Container>
                <FontAwesomeIcon icon={faBreadSlice} size="2x" />
                <span>빵집</span>
              </Container>
            </Link>
          </Icon>
          <Icon>
            <Link to={routes.chat}>
              <Container>
                <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                <span>채팅</span>
              </Container>
            </Link>
          </Icon>
          <Icon>
            <Link to={routes.manual}>
              <Container>
                <FontAwesomeIcon icon={faStickyNote} size="2x" />
                <span>설명서</span>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
        <IconContainer>
          <Icon>
            <Link to={routes.admin}>
              <Container>
                <FontAwesomeIcon
                  icon={isLoggedIn ? faUnlock : faLock}
                  size="2x"
                />
                <span>관리자</span>
              </Container>
            </Link>
          </Icon>
        </IconContainer>
      </Wrapper>
    </SHeader>
  );
}
