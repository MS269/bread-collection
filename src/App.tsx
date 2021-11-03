import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ChatProvider } from "./contexts/chat";
import { LoginContext, LoginProvider } from "./contexts/login";
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
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoginProvider>
          <ChatProvider>
            <Router basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route component={Home} path={routes.home} exact />
                <Route component={Bakery} path={routes.bakery} exact />
                <Route component={Chat} path={routes.chat} exact />
                <Route component={Manual} path={routes.manual} exact />
                <LoginContext.Consumer>
                  {({ isLoggedIn }) => (
                    <Route
                      component={isLoggedIn ? Admin : Login}
                      path={routes.admin}
                      exact
                    />
                  )}
                </LoginContext.Consumer>
                <NotFound />
              </Switch>
            </Router>
          </ChatProvider>
        </LoginProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
