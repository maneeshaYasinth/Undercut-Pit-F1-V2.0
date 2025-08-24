const axios = require("axios");

const getDriversStandings = async (req, res) => {
    try {
        const { season } = req.query; 
        let url = "https://api.jolpi.ca/ergast/f1";

        if (season) {
            url += `/${season}`;
        }

        url += "/driverstandings/";

        const response = await axios.get(url);

        // Navigate to the array of driver standings
        const driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        const drivers = driverStandings.map(item => ({
            id: item.Driver.driverId,
            fullName: `${item.Driver.givenName} ${item.Driver.familyName}`,
            teamName: item.Constructors[0]?.name || "N/A",
            countryCode: item.Driver.nationality,
            position: item.position,
            points: item.points,
            wins: item.wins
        }));

        res.json(drivers);
    } catch (err) {
        console.error("Error fetching driver standings:", err);
        res.status(500).json({ message: "Failed to fetch driver standings!" });
    }
};

module.exports = { getDriversStandings };
