const axios = require("axios");

//get all races by user preference
const getRace = async(req,res)=>{
    try{
        const {season,round} = req.query;
        let url = "https://api.jolpi.ca/ergast/f1";

        if(season){
            url += `/${season}`;
            if(round){
                url += `/${round}`;
            }
        }

        url += "/races/";
        const response = await axios.get(url);

    const races = response.data.MRData.RaceTable.Races.map(race => ({
      season: race.season,
      round: race.round,
      raceName: race.raceName,
      circuit: race.Circuit.circuitName,
      location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
      date: race.date,
      time: race.time || null,
      wikiUrl: race.url
    }));

    res.json(races);
    }catch(err) {
        console.error("Error fetching races:", err);
        res.status(500).json({ message: "failed to fetch servers!" });
    }
};

module.exports = { getRace };