import api from "./api";

export const getDrivers = async () => {
  try{
    const response = await api.get("/drivers");
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  }
}
