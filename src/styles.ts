import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const theme = {
  bgColor: "rgb(250, 250, 250)",
  blue: "rgb(0, 149, 246)",
  borderColor: "rgb(219, 219, 219)",
  chatBgColor: "rgb(239, 239, 239)",
  fontColor: "rgb(38, 38, 38)",
  red: "rgb(250, 62, 62)",
  shadow:
    "0 0 transparent, 0 0 transparent, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.fontColor};
        font-size:14px;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    input {
        all: unset;
    }
`;
