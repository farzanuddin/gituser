import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global.styled";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { darkTheme, lightTheme } from "./styles/utils/theme";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Search />
    </ThemeProvider>
  );
}

export default App;
