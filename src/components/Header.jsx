import styled from "styled-components";
import PropTypes from "prop-types";

import { Container } from "../styles/Container.styled";

import { MoonIcon } from "./icons/Moon";
import { SunIcon } from "./icons/Sun";

export const Header = ({ toggleTheme, theme }) => {
  return (
    <Container>
      <StyledHeader>
        <h1>GitUser</h1>
        <Toggle onClick={toggleTheme}>
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Toggle>
      </StyledHeader>
    </Container>
  );
};

Header.propTypes = {
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: ${({ theme }) => theme.pageTitle};
  }
`;

export const Toggle = styled.button`
  background: none;
  display: flex;
  color: ${({ theme }) => theme.toggleButton.color};
  text-transform: uppercase;
  letter-spacing: 3px;
  gap: 1rem;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    color: ${({ theme }) => theme.toggleButton.hoverColor};

    svg path,
    svg g {
      fill: ${({ theme }) => theme.toggleButton.hoverColor};
    }
  }

  svg path,
  svg g {
    fill: ${({ theme }) => theme.toggleButton.color};
  }
`;
