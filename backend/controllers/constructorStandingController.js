const axios = require("axios");

// Get Constructor Standings (reshaped)
const getConstructorStanding = async (req, res) => {
  try {
    const { season } = req.query;
    let url = "https://api.jolpi.ca/ergast/f1";

    if (season) {
      url += `/${season}`;
    }

    url += "/constructorstandings/";

    const response = await axios.get(url);

    // Drill into MRData -> StandingsTable -> StandingsLists[0] -> ConstructorStandings
    const standingsList = response.data.MRData.StandingsTable.StandingsLists[0];

    const constructorStandings = standingsList.ConstructorStandings.map(team => ({
      position: team.position,
      positionText: team.positionText,
      points: team.points,
      wins: team.wins,
      constructorName: team.Constructor.name
    }));

    // Send a nice structured response
    res.json({
      season: standingsList.season,
      round: standingsList.round,
      constructorStandings
    });
  } catch (err) {
    console.error("Error fetching constructor standings:", err.message);
    res.status(500).json({ message: "Failed to fetch constructor standings!" });
  }
};

module.exports = { getConstructorStanding };
