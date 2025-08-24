const axios = require("axios");

// get all results by user preference
const getResults = async (req, res) => {
  try {
    const { season, round } = req.query;
    let url = "https://api.jolpi.ca/ergast/f1";

    if (season) {
      url += `/${season}`;
      if (round) {
        url += `/${round}`;
      }
    }

    url += "/qualifying/";
    const response = await axios.get(url);

    const races = response.data.MRData.RaceTable.Races.map(race => ({
      raceName: race.raceName,
      circuit: race.Circuit.circuitName,
      location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
      date: race.date,
      results: race.QualifyingResults.map(result => ({
        position: result.position,
        driverNumber: result.number,
        driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
        q1: result.Q1 || null,
        q2: result.Q2 || null,
        q3: result.Q3 || null
      }))
    }));

    res.json(races);
  } catch (err) {
    console.error("Error fetching qualifying results:", err);
    res.status(500).json({ message: "Failed to fetch qualifying results!" });
  }
};

module.exports = { getResults };
