const User = require("../db/postgresql/models/user");

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    await user.destroy();
    res.status(200).json({ message: "User account deleted successfully!" });

    console.log("User deleted successfully:", id);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  getUser,
  deleteUser,
};
