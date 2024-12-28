process.env.NODE_ENV = 'test';

const { sequelize } = require("../db/postgresql/setup");

const User = require("../db/postgresql/models/user");
const Goal = require("../db/postgresql/models/goal");

// Clean the DB before and after tests
before(async () => {
  await sequelize.sync({ force: true });
  await User.destroy({ where: {} });
  await Goal.destroy({ where: {} });
});

after(async () => {
  await User.destroy({ where: {} });
  await Goal.destroy({ where: {} });
});