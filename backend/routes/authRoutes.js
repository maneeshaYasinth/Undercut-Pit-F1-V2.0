const express = require("express");
const { registerUser, registerAdmin, loginUser, loginAdmin, logout } = require("../controllers/authController");

const router = express.Router();

// Register
router.post("/register", registerUser);

//register as admin
router.post("/admin/register", registerAdmin);

// Login
router.post("/login", loginUser);

//login as admin
router.post("/admin/login", loginAdmin);

// Logout (both user and admin)
router.post("/logout", logout);

module.exports = router;
