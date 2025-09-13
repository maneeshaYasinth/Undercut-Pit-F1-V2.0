import { createContext, useContext, useState, useEffect } from "react";
import { getUser, logout as logoutService } from "../services/authService";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  // Listen for localStorage changes (multi-tab support)
  useEffect(() => {
    const handleStorageChange = () => setUser(getUser());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Call this after login/register
  const loginUser = (userData) => setUser(userData);

  const logout = () => {
    logoutService(); // remove token & user from localStorage
    setUser(null);   // update context
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
