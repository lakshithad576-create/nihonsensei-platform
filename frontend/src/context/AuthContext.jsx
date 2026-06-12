// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    // localStorage වෙනුවට sessionStorage භාවිතා කර ඇත
    const token = sessionStorage.getItem("token");

    if (!token) {
      setCurrentUser(null);
      setUserProfile(null);
      setLoading(false);
      return;
    }

    try {
      const data = await apiRequest("/auth/me");

      setCurrentUser(data.user);
      setUserProfile(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      setCurrentUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // localStorage වෙනුවට sessionStorage භාවිතා කර ඇත
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    setCurrentUser(data.user);
    setUserProfile(data.user);

    return data.user;
  };

  const signup = async (payload) => {
    const data = await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    // localStorage වෙනුවට sessionStorage භාවිතා කර ඇත
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    setCurrentUser(data.user);
    setUserProfile(data.user);

    return data.user;
  };

  const logout = async () => {
    try {
      await apiRequest("/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.log("Logout API failed, clearing frontend token anyway");
    }

    // localStorage වෙනුවට sessionStorage භාවිතා කර ඇත
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setCurrentUser(null);
    setUserProfile(null);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    signup,
    logout,
    loadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
};