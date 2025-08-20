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

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "F1 Backend is running 🚀 lets goo" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
