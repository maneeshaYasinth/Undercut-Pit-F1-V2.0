const express = require("express");
const { registerUser, registerAdmin, loginUser, loginAdmin } = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerUser);

//register as admin
router.post("/admin/register", registerAdmin);

// Login
router.post("/login", loginUser);

//login as admin
router.post("/admin/login", loginAdmin);

module.exports = router;
