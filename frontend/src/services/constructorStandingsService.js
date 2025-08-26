import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/constructorstandings";

/**
 * Fetch constructor standings for a specific season.
 * @param {string} season 
 * @returns {Promise<Array>} 
 */
export const getConstructorStandings = async (season) => {
  try {
    const token = getToken();
    const url = `${API_URL}?season=${season}`;
    const res = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching constructor standings:", error);
    throw error;
  }
};