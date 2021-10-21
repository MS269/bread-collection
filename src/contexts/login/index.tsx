import React, { createContext, useState } from "react";

const LoginContext = createContext({
  isLoggedIn: false,
  login: () => {},
});

function LoginProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  return (
    <LoginContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
