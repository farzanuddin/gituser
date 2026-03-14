import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global.styled";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { darkTheme, lightTheme } from "./styles/utils/theme";
import { createHeaderStatus } from "./utils/headerStatus";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "dark";
  });
  const [headerStatus, setHeaderStatus] = useState(() => createHeaderStatus());

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <MainContent>
        <Header toggleTheme={toggleTheme} theme={theme} status={headerStatus} />
        <Search onStatusChange={setHeaderStatus} />
      </MainContent>
    </ThemeProvider>
  );
}

const MainContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(0.6rem, 1.2vh, 1.2rem);
`;

export default App;
