import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isLoggedInState } from "./atoms";
import routes from "./routes";
import Admin from "./screens/Admin";
import Bakery from "./screens/Bakery";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Manual from "./screens/Manual";
import NotFound from "./screens/NotFound";
import { GlobalStyles, theme } from "./styles";

export default function App() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route component={Home} path={routes.home} exact />
            <Route component={Bakery} path={routes.bakery} exact />
            <Route component={Chat} path={routes.chat} exact />
            <Route component={Manual} path={routes.manual} exact />
            <Route
              component={isLoggedIn ? Admin : Login}
              path={routes.admin}
              exact
            />
            <NotFound />
          </Switch>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
