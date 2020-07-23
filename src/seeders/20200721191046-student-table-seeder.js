"use strict";

const _ = require("lodash");
const faker = require("faker");

const rows = _.range(1, 21).map(() => {
  return {
    name_en: faker.internet.userName(),
    name_mm: faker.internet.userName(),
    nrc: faker.random.alphaNumeric(4),
    nrc_front: faker.image.imageUrl(),
    nrc_back: faker.image.imageUrl(),
    gender: Number(faker.random.boolean()),
    birthday: faker.date.past(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    hostel_address: faker.address.streetAddress(),
    photo: faker.image.imageUrl(),
    ward_recommendation_letter: faker.image.imageUrl(),
    police_recommendation_letter: faker.image.imageUrl(),
    religion_id: _.random(1, 8),
    ethnicity_id: _.random(1, 135),
    township_id: _.random(1, 10),
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE students AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("students", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("students", null);
  },
};
