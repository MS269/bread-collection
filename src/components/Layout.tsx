import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Content = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  max-width: 935px;
  width: 100%;
  margin: 30px auto;
  padding: 16px;
  border: solid 1px ${(props) => props.theme.borderColor};
`;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}

export default Layout;
