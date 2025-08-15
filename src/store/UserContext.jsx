import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  actions: false,
  login: (user) => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(user) {
    setUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("authUser");
  }

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;