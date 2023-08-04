import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import styled from "styled-components";

import { Container } from "../styles/Container.styled";
import { Display } from "./Display";

import { device } from "../styles/utils/theme";
import searchIcon from "../assets/icon-search.svg";

const getGithubUserInformation = async (userName) => {
  const octo = new Octokit();
  let response;
  response = await octo.request("GET /users/{username}", {
    username: userName,
  });

  return response.data;
};

export const Search = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const searchUser = async (username) => {
    try {
      const results = await getGithubUserInformation(username);
      setData(Object.assign({}, results));
    } catch (error) {
      setError("No results");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      setError("Invalid Search");
      return;
    }

    setError("");
    searchUser(search);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBlur = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchUser("farzanuddin");
  }, []);

  return (
    <main>
      <Container>
        <SearchBar autoComplete="off" onSubmit={handleSubmit}>
          <SearchInput htmlFor="userSearch">
            <img src={searchIcon} alt="Search Icon" />
            <input
              id="userSearch"
              type="text"
              placeholder="Search github username..."
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </SearchInput>
          <SendSearch>
            <p>{error}</p>
            <SubmitButton>Search</SubmitButton>
          </SendSearch>
        </SearchBar>
        <Display data={data}></Display>
      </Container>
    </main>
  );
};

const SearchBar = styled.form`
  align-items: center;
  background-color: ${({ theme }) => theme.searchBar};
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  min-height: 6.9rem;
  padding: 0 0.5em;
  width: 100%;
`;

const SearchInput = styled.label`
  display: flex;

  & > * {
    margin-left: 0.7rem;
  }

  input {
    font-size: 1.3rem;
    width: 25ch;
    border: none;
    background-color: ${({ theme }) => theme.searchBar};
    outline: none;
    margin-left: 1rem;

    &,
    &::placeholder {
      color: ${({ theme }) => theme.searchText};
    }
  }
`;

const SendSearch = styled.div`
  align-items: center;
  display: flex;
  gap: 1.5rem;

  p {
    font-size: 1.3rem;
    display: none;
    color: ${({ theme }) => theme.errorText};
    font-weight: bold;

    @media ${device.tablet} {
      display: block;
    }
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primaryButton.background};
  border-radius: 10px;
  border: transparent;
  color: ${({ theme }) => theme.primaryButton.color};
  outline: none;
  padding: 1.3em 1.5em;

  &:hover {
    opacity: 0.6;
  }
`;
