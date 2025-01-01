module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "privacyConsent", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "privacyConsent");
  },
};
