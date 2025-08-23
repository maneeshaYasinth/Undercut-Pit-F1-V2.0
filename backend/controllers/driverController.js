const axios = require("axios");

const getDrivers = async (req, res) => {
    try {
        //const { season } = req.query; 
        let url = "https://api.openf1.org/v1/drivers?session_key=latest";

        // if (season) {
        //     url += `/${season}`;
        // }

        // url += "/drivers/";
        const response = await axios.get(url);

        const drivers = response.data.map(driver => ({
            id: driver.driver_number,
            fullName: driver.full_name,
            broadcastName: driver.broadcast_name,
            teamName: driver.team_name,
            headshotUrl: driver.headshot_url,
            countryCode: driver.country_code
        }));


        res.json(drivers);
    } catch (err) {
        console.error("Error fetching drivers:", err);
        res.status(500).json({ message: "Failed to fetch drivers!" });
    }
};

module.exports = { getDrivers };
