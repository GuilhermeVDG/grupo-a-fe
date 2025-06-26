import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "styled-components";
// import GlobalStyle from "./global/styles";
// import theme from "./global/styles/theme";
import { Router } from "./routes/Router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
