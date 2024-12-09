const pool = require("../db");

const jwt = require("jsonwebtoken");
// Secret key for signing the token
const JWT_SECRET = "your_secret_key";

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Query the database for the user
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];

    // Validate password (no bcrypt, plain-text for simplicity)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

 
   
    // Function to generate JWT token
    const generateToken = (user) => {
         const payload = {
                id: user.id,
                email: user.email,
                typerole: user.typerole,
               };
  
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
  };


     // Generate JWT token
  const token = generateToken(user);

    // Set the token in a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { login };
