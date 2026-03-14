import { ThemeProvider } from "styled-components";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Search } from "./Search";
import { lightTheme } from "../styles/utils/theme";

const mockFetch = vi.fn();

const createJsonResponse = (data, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: vi.fn().mockResolvedValue(data),
});

const createErrorResponse = (status) => ({
  ok: false,
  status,
  json: vi.fn().mockResolvedValue({}),
});

const renderSearch = () => {
  const onStatusChange = vi.fn();

  return render(
    <ThemeProvider theme={lightTheme}>
      <Search onStatusChange={onStatusChange} />
    </ThemeProvider>
  );
};

const octocatData = {
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  html_url: "https://github.com/octocat",
  name: "The Octocat",
  login: "octocat",
  created_at: "2020-01-01T00:00:00Z",
  bio: "A test bio",
  public_repos: 8,
  followers: 10,
  following: 12,
  location: "San Francisco",
  blog: "https://github.blog",
  company: "GitHub",
};

const farzanData = {
  ...octocatData,
  login: "second-user",
  html_url: "https://github.com/second-user",
  name: "Second User",
};

const reposData = [
  {
    id: 1,
    name: "alpha",
    html_url: "https://github.com/octocat/alpha",
    pushed_at: "2024-03-01T00:00:00Z",
    stargazers_count: 5,
    fork: false,
  },
  {
    id: 2,
    name: "beta",
    html_url: "https://github.com/octocat/beta",
    pushed_at: "2024-02-01T00:00:00Z",
    stargazers_count: 2,
    fork: false,
  },
];

describe("Search", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("loads default user and shows a not found error when a searched user does not exist", async () => {
    mockFetch
      .mockResolvedValueOnce(createJsonResponse(octocatData))
      .mockResolvedValueOnce(createJsonResponse(reposData))
      .mockResolvedValueOnce(createErrorResponse(404));

    renderSearch();

    await waitFor(() => {
      expect(screen.getByText("@octocat")).toBeInTheDocument();
    });

    const input = screen.getByLabelText("Search GitHub username");
    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, "this-user-does-not-exist-123");
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByText("User not found").length).toBeGreaterThan(0);
    });
  });

  it("shows rate-limit message when GitHub API returns 403", async () => {
    mockFetch.mockResolvedValueOnce(createErrorResponse(403));

    renderSearch();

    await waitFor(() => {
      expect(
        screen.getAllByText("Rate limit reached. Please try again later.").length
      ).toBeGreaterThan(0);
    });
  });

  it("shows cached-result badge when a user is searched more than once", async () => {
    mockFetch.mockImplementation((url) => {
      const requestUrl = String(url);

      if (requestUrl.includes("/repos?")) {
        return Promise.resolve(createJsonResponse(reposData));
      }

      return Promise.resolve(createJsonResponse(octocatData));
    });

    const onStatusChange = vi.fn();

    render(
      <ThemeProvider theme={lightTheme}>
        <Search onStatusChange={onStatusChange} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("@octocat")).toBeInTheDocument();
    });

    const input = screen.getByLabelText("Search GitHub username");
    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, "farzanuddin");
    await userEvent.click(button);

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          showCache: true,
        })
      );
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("keeps only the latest search result when requests resolve out of order", async () => {
    const createDeferred = () => {
      let resolve;
      const promise = new Promise((res) => {
        resolve = res;
      });

      return { promise, resolve };
    };

    const firstRequest = createDeferred();
    const secondRequest = createDeferred();

    mockFetch.mockImplementation((url) => {
      const requestUrl = String(url);

      if (requestUrl.includes("/repos?")) {
        return Promise.resolve(createJsonResponse(reposData));
      }

      if (requestUrl.includes("/users/first-user")) {
        return firstRequest.promise;
      }

      if (requestUrl.includes("/users/second-user")) {
        return secondRequest.promise;
      }

      return Promise.resolve(createJsonResponse(octocatData));
    });

    renderSearch();

    await waitFor(() => {
      expect(screen.getByText("@octocat")).toBeInTheDocument();
    });

    const input = screen.getByLabelText("Search GitHub username");
    const button = screen.getByRole("button", { name: /search/i });
    const form = input.closest("form");

    expect(form).not.toBeNull();

    await userEvent.clear(input);
    await userEvent.type(input, "first-user");
    await userEvent.click(button);

    await userEvent.clear(input);
    await userEvent.type(input, "second-user");
    fireEvent.submit(form);

    secondRequest.resolve(createJsonResponse(farzanData));

    await waitFor(() => {
      expect(screen.getByText("@second-user")).toBeInTheDocument();
    });

    firstRequest.resolve(
      createJsonResponse({ ...octocatData, login: "first-user", name: "First User" })
    );

    await waitFor(() => {
      expect(screen.queryByText("@first-user")).not.toBeInTheDocument();
    });
  });
});
