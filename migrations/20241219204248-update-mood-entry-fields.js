module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("mood_entries", "moodScore", {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 10,
      },
    });
    await queryInterface.changeColumn("mood_entries", "energyLevel", {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 10,
      },
    });
    await queryInterface.changeColumn("mood_entries", "stressLevel", {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 10,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("mood_entries", "moodScore", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("mood_entries", "energyLevel", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("mood_entries", "stressLevel", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
