export const device = {
  tablet: "(min-width: 768px)",
  laptop: "(min-width: 1024px)",
};

const theme = {
  spacing: {
    xxs: "0.5rem",
    xs: "0.7rem",
    sm: "0.8rem",
    lg: "1.5rem",
  },
  radius: {
    sm: "15px",
    lg: "15px",
    full: "50%",
  },
  background: {
    light: "#dfe6f1",
    dark: "#0f172a",
  },
  color: {
    light: "#3a4a63",
    dark: "#e6edf7",
  },
  primaryButton: {
    background: {
      light: "#1f6feb",
      dark: "#4f8cff",
    },
    color: {
      light: "#fff",
      dark: "#fff",
    },
    hoverBackground: {
      light: "#4b8dff",
      dark: "#78a8ff",
    },
  },
  toggleButton: {
    color: {
      light: "#596d8f",
      dark: "#d6e2f2",
    },
    hoverColor: {
      light: "#2a3650",
      dark: "#8bb3ff",
    },
  },
  searchBar: {
    light: "#ffffff",
    dark: "#1b263b",
  },
  searchText: {
    light: "#385075",
    dark: "#dbe7fa",
  },
  errorText: {
    light: "#d14343",
    dark: "#ff6b6b",
  },
  resultsBackground: {
    light: "#ffffff",
    dark: "#182338",
  },
  searchName: {
    light: "#1f6feb",
    dark: "#6ea8ff",
  },
  dateJoined: {
    light: "#6b7f9f",
    dark: "#b8c7df",
  },
  userName: {
    light: "#1f2a3a",
    dark: "#f0f6ff",
  },
  userBio: {
    light: "#4a6287",
    dark: "#c9d8ef",
  },
  userStats: {
    background: {
      light: "#eef3fb",
      dark: "#101a2d",
    },
    statTitle: {
      light: "#4d6488",
      dark: "#c5d4ea",
    },
    statNum: {
      light: "#1f2a3a",
      dark: "#f0f6ff",
    },
  },
  userSocial: {
    color: {
      light: "#4a6287",
      dark: "#c9d8ef",
    },
    link: {
      light: "#1f6feb",
      dark: "#6ea8ff",
    },
  },
  elevation: {
    cardShadow: {
      light: "0 10px 30px rgba(30, 64, 124, 0.12)",
      dark: "0 14px 34px rgba(2, 8, 20, 0.55)",
    },
    softShadow: {
      light: "0 4px 12px rgba(30, 64, 124, 0.08)",
      dark: "0 6px 16px rgba(2, 8, 20, 0.38)",
    },
  },
};

const pickModeValue = (values, themeMode) => values[themeMode];

const generateTheme = (themeMode) => {
  return {
    spacing: theme.spacing,
    radius: theme.radius,
    background: pickModeValue(theme.background, themeMode),
    color: pickModeValue(theme.color, themeMode),
    primaryButton: {
      background: pickModeValue(theme.primaryButton.background, themeMode),
      color: pickModeValue(theme.primaryButton.color, themeMode),
      hoverBackground: pickModeValue(theme.primaryButton.hoverBackground, themeMode),
    },
    toggleButton: {
      color: pickModeValue(theme.toggleButton.color, themeMode),
      hoverColor: pickModeValue(theme.toggleButton.hoverColor, themeMode),
    },
    searchBar: pickModeValue(theme.searchBar, themeMode),
    searchText: pickModeValue(theme.searchText, themeMode),
    errorText: pickModeValue(theme.errorText, themeMode),
    resultsBackground: pickModeValue(theme.resultsBackground, themeMode),
    searchName: pickModeValue(theme.searchName, themeMode),
    dateJoined: pickModeValue(theme.dateJoined, themeMode),
    userName: pickModeValue(theme.userName, themeMode),
    userBio: pickModeValue(theme.userBio, themeMode),
    userStats: {
      background: pickModeValue(theme.userStats.background, themeMode),
      statTitle: pickModeValue(theme.userStats.statTitle, themeMode),
      statNum: pickModeValue(theme.userStats.statNum, themeMode),
    },
    userSocial: {
      color: pickModeValue(theme.userSocial.color, themeMode),
      link: pickModeValue(theme.userSocial.link, themeMode),
    },
    elevation: {
      cardShadow: pickModeValue(theme.elevation.cardShadow, themeMode),
      softShadow: pickModeValue(theme.elevation.softShadow, themeMode),
    },
  };
};

export const lightTheme = generateTheme("light");
export const darkTheme = generateTheme("dark");
