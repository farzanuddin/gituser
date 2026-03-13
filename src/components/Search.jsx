import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { Container } from "../styles/Container.styled";
import { Display } from "./Display";
import { useGithubUserSearch } from "../hooks/useGithubUserSearch";
import { shake } from "../styles/utils/animations";
import { SearchIcon, SpinningLoader } from "../icons";

export const Search = ({ onStatusChange }) => {
  const {
    data,
    error,
    handleChange,
    handleSearchBarClick,
    handleSubmit,
    loading,
    searchInputRef,
    shake,
  } = useGithubUserSearch({ onStatusChange });

  return (
    <SearchSection>
      <Container>
        <SearchBar autoComplete="off" onSubmit={handleSubmit} onClick={handleSearchBarClick}>
          <SearchInput htmlFor="userSearch">
            <SearchIcon />
            <input
              ref={searchInputRef}
              id="userSearch"
              type="text"
              placeholder="Search GitHub user..."
              onChange={handleChange}
              aria-label="Search GitHub username"
            />
          </SearchInput>
          <SearchOptions>
            <ScreenReaderStatus aria-live="polite">
              {loading ? "Searching user..." : error}
            </ScreenReaderStatus>
            {loading && <SpinningLoader />}
            <SubmitButton $shake={shake} disabled={loading} aria-busy={loading}>
              {loading ? "Searching..." : "Search"}
            </SubmitButton>
          </SearchOptions>
        </SearchBar>
        {data && <Display data={data}></Display>}
      </Container>
    </SearchSection>
  );
};

Search.propTypes = {
  onStatusChange: PropTypes.func,
};

const SearchSection = styled.main`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchBar = styled.form`
  align-items: center;
  background-color: ${({ theme }) => theme.searchBar};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  cursor: text;
  justify-content: flex-start;
  margin-top: 0;
  min-height: clamp(5.2rem, 7vh, 6rem);
  padding: 0 0 0 ${({ theme }) => theme.spacing.xxs};
  width: 100%;
  box-shadow: ${({ theme }) => theme.elevation.softShadow};
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:focus-within {
    box-shadow: ${({ theme }) => theme.elevation.cardShadow};
    transform: translateY(-1px);
  }

  button {
    cursor: pointer;
  }
`;

const SearchInput = styled.label`
  display: flex;
  cursor: text;

  & > * {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }

  svg {
    color: ${({ theme }) => theme.searchName};
    transition: filter 0.2s ease;
  }

  &:focus-within svg {
    filter: drop-shadow(0 0 6px ${({ theme }) => theme.searchName});
  }

  input {
    font-size: 1.3rem;
    width: min(25ch, 100%);
    border: none;
    background-color: ${({ theme }) => theme.searchBar};
    outline: none;
    margin-left: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.searchText};

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.searchText};
      opacity: 0.55;
    }
  }
`;

const SearchOptions = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-left: auto;
  padding-right: ${({ theme }) => theme.spacing.xxs};

  @media (max-width: 520px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primaryButton.background};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: transparent;
  color: ${({ theme }) => theme.primaryButton.color};
  outline: none;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  min-height: 4rem;
  padding: 0.8em 1.25em;

  animation: ${({ $shake }) =>
    $shake
      ? css`
          ${shake} 0.5s
        `
      : "none"};
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.primaryButton.hoverBackground};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ScreenReaderStatus = styled.p`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
