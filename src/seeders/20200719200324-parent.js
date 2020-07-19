"use strict";

const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let parents = [];
    for (let id = 1; id <= 20; id++) {
      parents.push({
        father_name_mm: faker.internet.userName(),
        father_name_en: faker.internet.userName(),
        father_nrc: faker.helpers.userCard(),
        father_nrc_front: faker.image.imageUrl(),
        father_nrc_back: faker.image.imageUrl(),
        father_job: faker.name.jobTitle(),
        father_phone: faker.phone.phoneNumber(),
        mother_name_mm: faker.internet.userName(),
        mother_name_en: faker.internet.userName(),
        mother_nrc: faker.helpers.userCard(),
        mother_nrc_front: faker.image.imageUrl(),
        mother_nrc_back: faker.image.imageUrl(),
        mother_job: faker.name.jobTitle(),
        mother_phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        township_id: id,
        student_id: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.buldDelete("parents", parents, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("parents", null, {});
  },
};
