module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("majors", [
      {
        name: "ICT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "IST",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "CE", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "EcE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ame",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Pre", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("majors", null, {});
  },
};
