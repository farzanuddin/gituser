import { useCallback, useEffect, useRef, useState } from "react";
import { Octokit } from "octokit";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Container } from "../styles/Container.styled";
import { Display } from "./Display";

import { SearchIcon, SpinningLoader } from "../icons";

const DEFAULT_USER = "farzanuddin";
const ERROR_MESSAGES = {
  emptySearch: "Please enter a username",
  userNotFound: "User not found",
  rateLimit: "Rate limit reached. Please try again later.",
  network: "Network error. Check your connection and try again.",
  generic: "Something went wrong. Please try again.",
};

const getErrorMessage = (errorObj) => {
  if (errorObj?.status === 404) {
    return ERROR_MESSAGES.userNotFound;
  }

  if (errorObj?.status === 403) {
    return ERROR_MESSAGES.rateLimit;
  }

  if (errorObj?.name === "TypeError") {
    return ERROR_MESSAGES.network;
  }

  return ERROR_MESSAGES.generic;
};

const getGithubUserInformation = async (userName) => {
  const octo = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });

  const response = await octo.request("GET /users/{username}", {
    username: userName,
  });

  return response.data;
};

export const Search = ({ onStatusChange }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCachedResult, setIsCachedResult] = useState(false);
  const searchInputRef = useRef(null);
  const userCache = useRef(new Map());
  const activeRequestId = useRef(0);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  }, []);

  const searchUser = useCallback(async (username) => {
    const normalizedUsername = username.trim();
    const cacheKey = normalizedUsername.toLowerCase();

    if (!normalizedUsername) {
      setError(ERROR_MESSAGES.emptySearch);
      triggerShake();
      return;
    }

    if (userCache.current.has(cacheKey)) {
      setError("");
      setIsCachedResult(true);
      setData(userCache.current.get(cacheKey));
      return;
    }

    const requestId = activeRequestId.current + 1;
    activeRequestId.current = requestId;
    setLoading(true);
    setError("");

    try {
      const results = await getGithubUserInformation(normalizedUsername);

      if (requestId !== activeRequestId.current) {
        return;
      }

      userCache.current.set(cacheKey, results);
      setIsCachedResult(false);
      setData(results);
    } catch (errorObj) {
      if (requestId !== activeRequestId.current) {
        return;
      }

      setIsCachedResult(false);
      setError(getErrorMessage(errorObj));
      triggerShake();
    } finally {
      if (requestId === activeRequestId.current) {
        setLoading(false);
      }
    }
  }, [triggerShake]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchUser(search);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchBarClick = (e) => {
    const clickedButton = e.target.closest("button");

    if (clickedButton) {
      return;
    }

    searchInputRef.current?.focus();
  };

  useEffect(() => {
    searchUser(DEFAULT_USER);
  }, [searchUser]);

  useEffect(() => {
    onStatusChange?.({
      showCache: isCachedResult,
      showWarning: Boolean(error),
      warningText: error,
    });
  }, [error, isCachedResult, onStatusChange]);

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
            <ScreenReaderStatus aria-live="polite">{loading ? "Searching user..." : error}</ScreenReaderStatus>
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
  margin-top: clamp(0.6rem, 1vh, 1.2rem);
  min-height: clamp(5.2rem, 7vh, 6rem);
  padding: 0 0 0 ${({ theme }) => theme.spacing.xxs};
  width: 100%;

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
    width: 25ch;
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

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }

  animation: ${({ $shake }) => ($shake ? "shake 0.5s" : "none")};

  &:hover {
    opacity: 0.6;
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
