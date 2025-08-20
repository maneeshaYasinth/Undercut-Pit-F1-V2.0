const axios = require("axios");

const getDrivers = async (req, res) => {
    try {
        const { season } = req.query; // changed from "session" to "season"
        let url = "https://api.jolpi.ca/ergast/f1";

        if (season) {
            url += `/${season}`;
        }

        url += "/drivers/";
        const response = await axios.get(url);

        const drivers = response.data.MRData.DriverTable.Drivers.map(driver => ({
            id: driver.driverId,
            givenName: driver.givenName,
            familyName: driver.familyName,
            dateOfBirth: driver.dateOfBirth,
            nationality: driver.nationality,
            wikiUrl: driver.url
        }));

        res.json(drivers);
    } catch (err) {
        console.error("Error fetching drivers:", err);
        res.status(500).json({ message: "Failed to fetch drivers!" });
    }
};

module.exports = { getDrivers };
