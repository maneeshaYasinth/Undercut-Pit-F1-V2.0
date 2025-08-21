const axios = require("axios");

//get all results by user preference
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

    url += "/results/";
    const response = await axios.get(url);

    const races = response.data.MRData.RaceTable.Races.map(race => ({
      raceName: race.raceName,
      circuit: race.Circuit.circuitName,
      location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
      date: race.date,
      time: race.time || null,
      results: race.Results.map(result => ({
        position: result.position,
        points: result.points,
        driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
        driverNationality: result.Driver.nationality,
        constructor: result.Constructor.name
      }))
    }));

    res.json(races);
  } catch (err) {
    console.error("Error fetching race results:", err);
    res.status(500).json({ message: "Failed to fetch race results!" });
  }
};

module.exports = { getResults };
