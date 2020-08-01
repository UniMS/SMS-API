"use strict";

const _ = require("lodash");
const faker = require("faker");

const rows = _.range(1, 21).map((index) => {
  return {
    father_name_en: faker.internet.userName(),
    father_name_mm: faker.internet.userName(),
    father_nrc: faker.random.alphaNumeric(4),
    father_nrc_front: faker.image.imageUrl(),
    father_nrc_back: faker.image.imageUrl(),
    father_job: faker.name.jobType(),
    father_phone: faker.phone.phoneNumber(),
    mother_name_en: faker.internet.userName(),
    mother_name_mm: faker.internet.userName(),
    mother_nrc: faker.random.alphaNumeric(4),
    mother_nrc_front: faker.image.imageUrl(),
    mother_nrc_back: faker.image.imageUrl(),
    mother_job: faker.name.jobType(),
    mother_phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    student_id: index,
    parent_township_id: _.random(1, 10),
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE parents AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("parents", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("parents", null);
  },
};
