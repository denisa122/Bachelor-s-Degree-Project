const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../db/postgresql/models/user");

const { registerValidation, loginValidation } = require("../validation");

const register = async (req, res) => {
  console.log(req.body);

  // Validate user input
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if email is already taken
  const emailExists = await User.findOne({ where: { email: req.body.email } });

  if (emailExists) {
    return res.status(400).json({ error: "Email is already taken!" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create user object and save it in the database
  const userObject = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  };

  try {
    const savedUser = await User.create(userObject);
    res.json({ error: null, data: savedUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  // Validate user login credentials
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(400).json({ error: "Incorrect email or password!" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Incorrect email or password!" });
  }

  // Create and assign token
  const token = jwt.sign(
    {
      id: user.userID,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  // Attach token to header
  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
};

const getLoginStatus = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id } = decoded;
      res.json({ isLoggedIn: true, id });
    } else {
      res.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error("Error fetching login status:", error);
    res.json({ isLoggedIn: false });
    res.status(500).json({ error });
  }
};

const logout = async (req, res) => {
  try {
    res.header("auth-token", "").json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  register,
  login,
  getLoginStatus,
  logout,
};
