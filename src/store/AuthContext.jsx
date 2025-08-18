import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  user: {},
  authenticate: (token, user) => {},
  logout: () => {},
  isAuthenticated: false,
});

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState({});

  function authenticate(_token, user) {
    setToken(_token);
    setUser(user);
    localStorage.setItem('token', _token);
  }

  function logout() {
    setToken(null);
    setUser({});
    localStorage.removeItem("token");
  }


  const value = {
    token,
    user,
    authenticate,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;