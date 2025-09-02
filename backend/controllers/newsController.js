const axios = require("axios");
const { model } = require("mongoose");

const getNews =async (req,res) =>{
    try{
        let url = "https://f1-latest-news.p.rapidapi.com/news";
        const response = await axios.get(url,
        {
            headers: {
                 "x-rapidapi-key": process.env.RAPIDAPI_KEY,   
                "x-rapidapi-host": "f1-latest-news.p.rapidapi.com"
            }
        });

        res.json(response.data);

    }catch(err){
        console.error("Error fetching news:", err);
        res.status(500).json({ message: "Failed to fetch news!" });
    }
};

module.exports = {getNews};
