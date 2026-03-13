import styled from "styled-components";
import PropTypes from "prop-types";

import { Container } from "../styles/Container.styled";

import { MoonIcon, SunIcon } from "../icons";

export const Header = ({ toggleTheme, theme, status }) => {
  return (
    <Container>
      <StyledHeader>
        <StatusSlot aria-live="polite">
          {status?.showCache && <StatusBadge>Loaded from cache</StatusBadge>}
          {status?.showWarning && <WarningStatusBadge>{status.warningText}</WarningStatusBadge>}
        </StatusSlot>
        <Toggle onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Toggle>
      </StyledHeader>
    </Container>
  );
};

Header.propTypes = {
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
  status: PropTypes.shape({
    showCache: PropTypes.bool,
    showWarning: PropTypes.bool,
    warningText: PropTypes.string,
  }),
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatusSlot = styled.div`
  min-height: 3.2rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const StatusBadge = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.searchBar};
  color: ${({ theme }) => theme.searchName};
  border: 1px solid transparent;
  font-size: 1.2rem;
  font-weight: 700;

  &::before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-radius: ${({ theme }) => theme.radius.full};
    background-color: ${({ theme }) => theme.searchName};
    animation: pulse 1.8s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.6;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.6;
    }
  }
`;

const WarningStatusBadge = styled(StatusBadge)`
  color: ${({ theme }) => theme.errorText};

  &::before {
    background-color: ${({ theme }) => theme.errorText};
  }
`;

const Toggle = styled.button`
  background: none;
  display: flex;
  color: ${({ theme }) => theme.toggleButton.color};
  text-transform: uppercase;
  letter-spacing: 3px;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 700;
  margin-right: 10px;

  &:hover {
    color: ${({ theme }) => theme.toggleButton.hoverColor};
  }
`;
