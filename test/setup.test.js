process.env.NODE_ENV = "test";

const { sequelize } = require("../db/postgresql/setup");

const User = require("../db/postgresql/models/user");
const Goal = require("../db/postgresql/models/goal");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database tables recreated successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

// Clean the DB before and after tests
before(async () => {
  await syncDatabase();

  await sequelize.sync({ force: true });
  await User.destroy({ where: {} });
  await Goal.destroy({ where: {} });
});

after(async () => {
  await User.destroy({ where: {} });
  await Goal.destroy({ where: {} });
});
