export const device = {
  tablet: "(min-width: 768px)",
  laptop: "(min-width: 1024px)",
};

const theme = {
  background: {
    light: "#F6F8FF",
    dark: "#141d2f",
  },
  color: {
    light: "#4b6a9b",
    dark: "#fff",
  },
  primaryButton: {
    background: {
      light: "#0079ff",
      dark: "#0079ff",
    },
    color: {
      light: "#fff",
      dark: "#fff",
    },
    hoverBackground: {
      light: "#60abff",
      dark: "#90a4d4",
    },
  },
  toggleButton: {
    color: {
      light: "#697c9a",
      dark: "#fff",
    },
    hoverColor: {
      light: "#222731",
      dark: "#90a4df",
    },
  },
  searchBar: {
    light: "#fefefe",
    dark: "#1e2a47",
  },
  searchText: {
    light: "#4B6A9B",
    dark: "#fff",
  },
  errorText: {
    light: "#f74646",
    dark: "#f74646",
  },
  resultsBackground: {
    light: "#fff",
    dark: "#1E2A47",
  },
  searchName: {
    light: "#0079FF",
    dark: "#0079FF",
  },
  dateJoined: {
    light: "#697c9a",
    dark: "#fff",
  },
  userName: {
    light: "#2b3442",
    dark: "#fff",
  },
  userBio: {
    light: "#4b6a9b",
    dark: "#fff",
  },
  userStats: {
    background: {
      light: "#f6f8ff",
      dark: "#141d2f",
    },
    statTitle: {
      light: "#4b6a9b",
      dark: "#fff",
    },
    statNum: {
      light: "#2b3442",
      dark: "#fff",
    },
  },
  userSocial: {
    color: {
      light: "#4b6a9b",
      dark: "#fff",
    },
    link: {
      light: "#0079FF",
      dark: "#0079FF",
    },
  },
};

const generateTheme = (themeMode) => {
  const isLight = themeMode === "light";

  return {
    background: theme.background[themeMode],
    color: theme.color[themeMode],
    pageTitle: theme.color[themeMode],
    primaryButton: {
      background: theme.primaryButton.background[themeMode],
      color: theme.primaryButton.color[themeMode],
      hoverBackground: theme.primaryButton.hoverBackground[themeMode],
    },
    toggleButton: {
      color: isLight ? theme.toggleButton.color.light : theme.toggleButton.color.dark,
      hoverColor: isLight
        ? theme.toggleButton.hoverColor.light
        : theme.toggleButton.hoverColor.dark,
    },
    searchBar: theme.searchBar[themeMode],
    searchText: theme.searchText[themeMode],
    errorText: theme.errorText[themeMode],
    resultsBackground: theme.resultsBackground[themeMode],
    searchName: theme.searchName[themeMode],
    dateJoined: theme.dateJoined[themeMode],
    userName: theme.userName[themeMode],
    userBio: theme.userBio[themeMode],
    userStats: {
      background: theme.userStats.background[themeMode],
      statTitle: theme.userStats.statTitle[themeMode],
      statNum: theme.userStats.statNum[themeMode],
    },
    userSocial: {
      color: isLight ? theme.userSocial.color.light : theme.userSocial.color.dark,
      link: isLight ? theme.userSocial.link.light : theme.userSocial.link.dark,
    },
  };
};

export const lightTheme = generateTheme("light");
export const darkTheme = generateTheme("dark");
