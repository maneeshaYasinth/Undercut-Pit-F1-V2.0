const axios = require("axios");

const getTeamRadio = async (req, res) => {
    try {
        const { driver_number } = req.query; 
        let url = "https://api.openf1.org/v1/team_radio?session_key=latest";

        if (driver_number) {
            url += `&driver_number=${driver_number}`;
        }

        const response = await axios.get(url);

        const teamRadio = response.data.map(radio => ({
          id: radio.driver_number,
          date: radio.date,
        message: radio.recording_url
        }));
        
        res.json(teamRadio);
    } catch (err) {
        console.error("Error fetching team radios:", err);
        res.status(500).json({ message: "Failed to fetch team radios!" });
    }
};

module.exports = { getTeamRadio };
