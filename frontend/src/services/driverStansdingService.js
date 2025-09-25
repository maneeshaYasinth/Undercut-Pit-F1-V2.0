import api from './api';

const API_URL = "http://localhost:5000/api/driverstandings";

/**
 * Fetch driver standings for a specific season.
 * @param {string} season
 * @returns {Promise<Array>}
 */
export const getDriverStandings = async (season) => {
  try {
    const response = await api.get(`/driverstandings?season=${season}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching driver standings:", error);
    throw error;
  }
};
