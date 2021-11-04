import styled from "styled-components";

export const Container = styled.div`
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

export const HasErrorInput = styled.input<{ hasError: boolean }>`
  opacity: ${(props) => (props.hasError ? "0.5" : "1")};
  cursor: ${(props) => (props.hasError ? "inherit" : "pointer")};
`;
