import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/driverstandings";

/**
 * 
 * @param {string} season 
 * @returns {Promise<Array>} 
 */
export const getDriverStandings = async (season) => {
  try {
    const token = getToken();
    const url = `${API_URL}?season=${season}`; // send season as query param
    const res = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching driver standings:", error);
    throw error;
  }
};
