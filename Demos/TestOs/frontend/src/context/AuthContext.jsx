import { createContext, useState, useCallback } from "react";
import { apiPost } from "../utils/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const isAuthenticated = !!token && !!user;

  const login = useCallback(async (endpoint, credentials) => {
    const res = await apiPost(endpoint, credentials);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
    return res;
  }, []);

  const register = useCallback(async (endpoint, data) => {
    const res = await apiPost(endpoint, data);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
