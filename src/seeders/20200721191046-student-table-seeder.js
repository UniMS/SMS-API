"use strict";
const _ = require("lodash");
const faker = require("faker");
const students = _.range(1, 51).map((index) => {
  return {
    name_en: faker.internet.userName(),
    name_mm: faker.internet.userName(),
    nrc: faker.random.number(),
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
    religion_id: Math.floor(Math.random() * 4) + 1,
    ethnicity_id: Math.floor(Math.random() * 135) + 1,
    township_id: Math.floor(Math.random() * 10) + 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE students AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("students", students, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("students", null, {});
  },
};
