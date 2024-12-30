module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('questionnaire_submissions', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('questionnaire_submissions', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('questionnaire_submissions', 'createdAt');
    await queryInterface.removeColumn('questionnaire_submissions', 'updatedAt');
  },
};
