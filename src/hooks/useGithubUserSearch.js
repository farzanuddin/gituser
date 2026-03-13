import { useCallback, useEffect, useRef, useState } from "react";
import { createHeaderStatus } from "../utils/headerStatus";
import { pickDisplayUserFields } from "../utils/githubUser";

const DEFAULT_USER = "farzanuddin";
const CACHE_MAX_ENTRIES = 30;
const CACHE_TTL_MS = 15 * 60 * 1000;

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

const getGithubUserInformation = async (userName, signal) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN?.trim();
  const headers = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(userName)}`, {
    headers,
    signal,
  });

  if (!response.ok) {
    const error = new Error("GitHub request failed");
    error.status = response.status;
    throw error;
  }

  return pickDisplayUserFields(await response.json());
};

const getCachedUser = (cacheMap, key) => {
  const cachedEntry = cacheMap.get(key);

  if (!cachedEntry) {
    return null;
  }

  if (Date.now() - cachedEntry.cachedAt > CACHE_TTL_MS) {
    cacheMap.delete(key);
    return null;
  }

  // refresh LRU position
  cacheMap.delete(key);
  cacheMap.set(key, cachedEntry);

  return cachedEntry.data;
};

const setCachedUser = (cacheMap, key, data) => {
  if (cacheMap.has(key)) {
    cacheMap.delete(key);
  }

  cacheMap.set(key, {
    data,
    cachedAt: Date.now(),
  });

  if (cacheMap.size > CACHE_MAX_ENTRIES) {
    const oldestKey = cacheMap.keys().next().value;
    cacheMap.delete(oldestKey);
  }
};

export const useGithubUserSearch = ({ onStatusChange }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCachedResult, setIsCachedResult] = useState(false);

  const searchInputRef = useRef(null);
  const userCache = useRef(new Map());
  const activeRequestId = useRef(0);
  const activeController = useRef(null);
  const shakeTimeoutRef = useRef(null);

  const triggerShake = useCallback(() => {
    if (shakeTimeoutRef.current) {
      clearTimeout(shakeTimeoutRef.current);
    }

    setShake(true);
    shakeTimeoutRef.current = setTimeout(() => {
      setShake(false);
    }, 500);
  }, []);

  const searchUser = useCallback(
    async (username) => {
      const normalizedUsername = username.trim();
      const cacheKey = normalizedUsername.toLowerCase();

      if (!normalizedUsername) {
        setError(ERROR_MESSAGES.emptySearch);
        triggerShake();
        return;
      }

      const cachedResult = getCachedUser(userCache.current, cacheKey);

      if (cachedResult) {
        setError("");
        setIsCachedResult(true);
        setData(cachedResult);
        return;
      }

      activeController.current?.abort();

      const controller = new AbortController();
      activeController.current = controller;

      const requestId = activeRequestId.current + 1;
      activeRequestId.current = requestId;

      setLoading(true);
      setError("");

      try {
        const displayUser = await getGithubUserInformation(normalizedUsername, controller.signal);

        if (requestId !== activeRequestId.current) {
          return;
        }

        setCachedUser(userCache.current, cacheKey, displayUser);
        setIsCachedResult(false);
        setData(displayUser);
      } catch (errorObj) {
        if (errorObj?.name === "AbortError") {
          return;
        }

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

        if (activeController.current === controller) {
          activeController.current = null;
        }
      }
    },
    [triggerShake]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      searchUser(search);
    },
    [search, searchUser]
  );

  const handleChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const handleSearchBarClick = useCallback((event) => {
    const clickedButton = event.target.closest("button");

    if (clickedButton) {
      return;
    }

    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    searchUser(DEFAULT_USER);
  }, [searchUser]);

  useEffect(() => {
    onStatusChange?.(createHeaderStatus({ showCache: isCachedResult, warningText: error }));
  }, [error, isCachedResult, onStatusChange]);

  useEffect(() => {
    return () => {
      activeController.current?.abort();

      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    error,
    handleChange,
    handleSearchBarClick,
    handleSubmit,
    loading,
    searchInputRef,
    shake,
  };
};
