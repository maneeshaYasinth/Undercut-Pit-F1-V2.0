const axios = require("axios");

const getNews = async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "Formula 1 OR F1",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 10
      },
      headers: {
        "X-Api-Key": process.env.NEWS_API
      }
    });

    const articles = response.data.articles;

    // ✅ Print all articles in console (for testing)
    console.log("--------- F1 NEWS ---------");
    articles.forEach((article, index) => {
      console.log(`\n${index + 1}. ${article.title}`);
      console.log(`Source: ${article.source.name}`);
      console.log(`Published: ${article.publishedAt}`);
      console.log(`Description: ${article.description}`);
      console.log(`URL: ${article.url}`);
      console.log("-----------------------------");
    });

    // ✅ Clean the data for frontend
    const cleanedNews = articles.map((article) => ({
      title: article.title,
      source: article.source.name,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      publishedAt: article.publishedAt
    }));

    // ✅ ALSO send to frontend / browser / Postman
    res.status(200).json(cleanedNews);

  } catch (error) {
    console.log("❌ Error fetching news:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
};

module.exports = { getNews };
