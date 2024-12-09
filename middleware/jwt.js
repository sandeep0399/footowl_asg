const jwt = require("jsonwebtoken");



// Secret key for signing the token
const JWT_SECRET = "your_secret_key";

// Middleware to authenticate JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Access denied. Login FIRST. go to this http://localhost:3000/login/" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};


module.exports = { authenticateJWT};
