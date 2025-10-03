const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


//AuthRoutes
const authRoutes = require("./routes/authRoutes"); 
app.use("/api/auth", authRoutes);

//get races routes
const raceRoutes = require("./routes/raceRoutes");
app.use("/api/races", raceRoutes);

//get driver routes
const driverRoutes = require("./routes/driverRoutes");
app.use("/api/drivers", driverRoutes);

//get results routes
const resultsRoutes = require("./routes/resultRoutes");
app.use("/api/results", resultsRoutes);

//get quli results routes
const quliResultsRoutes = require("./routes/quliResultRoutes");
app.use("/api/qualiresults", quliResultsRoutes);

//get getConstructorStanding routes
const constructorstandings = require("./routes/constructorstandingsRoutes");
app.use("/api/constructorstandings", constructorstandings);

//get getDriverStanding routes
const driverStandings = require("./routes/driverStandingRoutes");
app.use("/api/driverstandings", driverStandings);

//post the predictions
const predictions = require("./routes/predictionRoutes");
app.use("/api/predictions", predictions);

//post the manuel result and get the leaderboard
const scoreRoutes = require("./routes/scoreRoutes");
app.use("/api/scores", scoreRoutes);

//get news routes
const newsRoutes = require("./routes/newsRoutes");
app.use("/api/news", newsRoutes);

//get get team radio routes
const teamRadioRoutes = require("./routes/teamRadioRoutes");
app.use("/api/teamradio", teamRadioRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "F1 Backend is running 🚀 lets goo" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
