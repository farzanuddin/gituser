import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Container } from "../styles/Container.styled";
import { badgeReveal, pulse } from "../styles/utils/animations";
import { headerStatusShape } from "../utils/headerStatus";
import { MoonIcon, SunIcon } from "../icons";

export const Header = ({ toggleTheme, theme, status }) => {
  const hasStatus = Boolean(status?.showCache || status?.showWarning);

  return (
    <Container>
      <StyledHeader>
        <StatusSlot $hasStatus={hasStatus} aria-live="polite">
          {status?.showCache && <StatusBadge>Loaded from cache</StatusBadge>}
          {status?.showWarning && <WarningStatusBadge>{status.warningText}</WarningStatusBadge>}
        </StatusSlot>
        <Toggle
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Toggle>
      </StyledHeader>
    </Container>
  );
};

Header.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  status: headerStatusShape.isRequired,
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatusSlot = styled.div`
  min-height: 2.8rem;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: nowrap;
  overflow: hidden;
  visibility: ${({ $hasStatus }) => ($hasStatus ? "visible" : "hidden")};
`;

const statusBadgeBase = css`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.searchBar};
  box-shadow: ${({ theme }) => theme.elevation.softShadow};
  font-size: 1.2rem;
  font-weight: 700;
  animation: ${badgeReveal} 0.22s ease;
`;

const statusBadgeDot = css`
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  border-radius: ${({ theme }) => theme.radius.full};
  animation: ${pulse} 1.8s ease-in-out infinite;
`;

const StatusBadge = styled.p`
  ${statusBadgeBase}
  color: ${({ theme }) => theme.searchName};
  border: 1px solid rgba(111, 144, 189, 0.22);
  white-space: nowrap;

  &::before {
    ${statusBadgeDot}
    background-color: ${({ theme }) => theme.searchName};
  }
`;

const WarningStatusBadge = styled.p`
  ${statusBadgeBase}
  color: ${({ theme }) => theme.errorText};
  border-color: rgba(209, 67, 67, 0.34);
  border-style: solid;
  border-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::before {
    ${statusBadgeDot}
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
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.toggleButton.hoverColor};
    transform: translateY(-1px);
  }
`;
