import { ThemeProvider } from "styled-components";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Search } from "./Search";
import { lightTheme } from "../styles/utils/theme";

const mockRequest = vi.fn();

vi.mock("octokit", () => {
  return {
    Octokit: vi.fn().mockImplementation(() => ({
      request: mockRequest,
    })),
  };
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

describe("Search", () => {
  beforeEach(() => {
    mockRequest.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("loads default user and shows a not found error when a searched user does not exist", async () => {
    mockRequest
      .mockResolvedValueOnce({
        data: octocatData,
      })
      .mockRejectedValueOnce({ status: 404 });

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
    mockRequest.mockRejectedValueOnce({ status: 403 });

    renderSearch();

    await waitFor(() => {
      expect(screen.getAllByText("Rate limit reached. Please try again later.").length).toBeGreaterThan(0);
    });
  });

  it("shows cached-result badge when a user is searched more than once", async () => {
    mockRequest.mockResolvedValue({ data: octocatData });

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

    expect(mockRequest).toHaveBeenCalledTimes(1);
  });
});
