"use strict";
const _ = require("lodash");
const faker = require("faker");
const parents = _.range(1, 51).map((index) => {
  return {
    father_name_en: faker.internet.userName(),
    father_name_mm: faker.internet.userName(),
    father_nrc: faker.random.number(),
    father_nrc_front: faker.image.imageUrl(),
    father_nrc_back: faker.image.imageUrl(),
    father_job: faker.name.jobType(),
    father_phone: faker.phone.phoneNumber(),
    mother_name_en: faker.internet.userName(),
    mother_name_mm: faker.internet.userName(),
    mother_nrc: faker.random.number(),
    mother_nrc_front: faker.image.imageUrl(),
    mother_nrc_back: faker.image.imageUrl(),
    address: faker.address.streetAddress(),
    mother_job: faker.name.jobType(),
    mother_phone: faker.phone.phoneNumber(),
    student_id: index,
    township_id: Math.floor(Math.random() * 10) + 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE parents AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("parents", parents, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("parents", null, {});
  },
};
