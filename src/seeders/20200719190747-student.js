"use strict";
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let students = [];
    for (var id = 1; id <= 10; id++) {
      students.push({
        name_en: faker.internet.userName(),
        name_mm: faker.internet.userName(),
        nrc: faker.helpers.replaceSymbolWithNumber(),
        nrc_back: faker.image.imageUrl(),
        nrc_front: faker.image.imageUrl(),
        gender: faker.random.boolean(),
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetName(),
        hostel_address: faker.address.streetName(),
        photo: faker.image.imageUrl(),
        ward_recommendation_letter: faker.image.imageUrl(),
        police_recommendation_letter: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date(),
        township_id: id,
        religion_id: id,
        ethnicity_id: id,
      });
    }
    await queryInterface.bulkInsert("students", students, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("students", null, {});
  },
};
