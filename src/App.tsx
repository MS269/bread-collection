import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import routes from "./routes";
import Admin from "./screens/Admin";
import Bakery from "./screens/Bakery";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import Manual from "./screens/Manual";
import NotFound from "./screens/NotFound";
import { GlobalStyles, theme } from "./styles";

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={routes.home} exact>
              <Home />
            </Route>
            <Route path={routes.admin} exact>
              <Admin />
            </Route>
            <Route path={routes.bakery} exact>
              <Bakery />
            </Route>
            <Route path={routes.chat} exact>
              <Chat />
            </Route>
            <Route path={routes.manual} exact>
              <Manual />
            </Route>
            <NotFound />
          </Switch>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
