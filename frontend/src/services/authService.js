import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Save user
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

// Register user
export const register = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Save user
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// Get JWT token from localStorage
export const getToken = () => localStorage.getItem("token");

// Get current logged-in user from localStorage
export const getUser = () => JSON.parse(localStorage.getItem("user")); // ✅ Helper

// Logout user (client-side only)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
