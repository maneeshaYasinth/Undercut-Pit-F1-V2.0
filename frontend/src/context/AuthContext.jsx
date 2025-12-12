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

  // Improved logout with async support and proper cleanup
  const logout = async (notifyServer = false) => {
    try {
      await logoutService(notifyServer);
      setUser(null); // update context
      
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new CustomEvent('user-logout'));
      
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, clear local state
      setUser(null);
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
