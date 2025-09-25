import api from "./api";

/**
 * Fetch driver standings for a season
 * @param {string} season
 * @returns {Promise<Array>}
 */

export const getConstructorStandings = async (season) => {
  try{
    const response = await api.get(`/constructorstandings?season=${season}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching constructor standings:", error);
    throw error;
  }
}