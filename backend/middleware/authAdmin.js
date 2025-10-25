const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.admin = decoded; 
    next();

  } catch (err) {
    console.error("Admin auth error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authAdmin;
