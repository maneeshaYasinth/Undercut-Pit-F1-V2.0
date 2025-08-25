import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/drivers";

export const getDrivers = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  }
};

