import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    height: 100%;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    line-height: 1.4;
  }

  body {
    font-family: "Space Mono", monospace;
    font-size: 1.6rem;
    min-height: 100dvh;
    height: 100dvh;
    padding: clamp(1.2rem, 1.8vh, 2.2rem) 0;
    background-color: ${({ theme }) => theme.background};
    overflow: hidden;
  }

  #root {
    height: 100%;
  }

  a,
  button {
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-family: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  ul,
  li {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input {
    font-family: inherit;
  }

  button:focus-visible,
  input:focus-visible,
  a:focus-visible {
    outline: 2px solid ${({ theme }) => theme.searchName};
    outline-offset: 3px;
  }

  p,
  li,
  h1,
  h2,
  h3,
  h4 {
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;
