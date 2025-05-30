import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await api.get("/me");
          setUser(res.data);
        } catch (err) {
          logout();
        }
      }
      setLoading(false); 
    };

    verifyUser();
  }, [token]);

  const login = async (credentials) => {
    const response = await api.post("/login", credentials);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const register = async (formData) => {
    const response = await api.post("/register", formData);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      // silently fail
    }
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
