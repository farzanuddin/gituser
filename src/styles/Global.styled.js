import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  :root {
    --font-body: "Manrope", sans-serif;
    --font-display: "Space Grotesk", sans-serif;
  }

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
    font-family: var(--font-body);
    font-feature-settings: "liga" 1, "kern" 1;
    font-size: 1.6rem;
    min-height: 100dvh;
    height: 100dvh;
    padding: clamp(1.2rem, 1.8vh, 2.2rem) 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    overflow-x: hidden;
    overflow-y: auto;
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

  button,
  input,
  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-display);
  }

  h1,
  h2,
  h3,
  h4 {
    letter-spacing: -0.03em;
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
