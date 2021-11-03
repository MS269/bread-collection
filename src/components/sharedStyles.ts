import styled from "styled-components";

export const hasErrorInput = styled.input<{ hasError: boolean }>`
  opacity: ${(props) => (props.hasError ? "0.5" : "1")};
  cursor: ${(props) => (props.hasError ? "inherit" : "pointer")};
`;
