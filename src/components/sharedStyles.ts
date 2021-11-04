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

export const Input = styled.input`
  padding: 8px;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: 4px;
`;

export const Main = styled.main`
  width: 100%;
  margin: 6px 0px 30px 0px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

export const Visited = styled.div<{ visited: boolean }>`
  text-decoration: ${(props) => (props.visited ? "line-through" : "inherit")};
  opacity: ${(props) => (props.visited ? "0.5" : "1")};
`;
