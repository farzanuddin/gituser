import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { GlobalStyles } from "./styles/Global.styled";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { darkTheme, lightTheme } from "./styles/utils/theme";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "light";
  });
  const [headerStatus, setHeaderStatus] = useState({
    showCache: false,
    showWarning: false,
    warningText: "",
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppShell>
        <Header toggleTheme={toggleTheme} theme={theme} status={headerStatus} />
        <Search onStatusChange={setHeaderStatus} />
      </AppShell>
    </ThemeProvider>
  );
}

const AppShell = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(0.6rem, 1vh, 1.2rem);
`;

export default App;
