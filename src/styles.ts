import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const theme = {
  bgColor: "rgb(250, 250, 250)",
  borderColor: "rgb(219, 219, 219)",
  fontColor: "rgb(38, 38, 38)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.fontColor};
        font-size:14px;
    }
    a {
        color:inherit;
        text-decoration: none;
    }
    input {
        all:unset;
    }
`;
