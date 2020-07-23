'use strict';
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
   let enrollments = [];
   let rollNumber = ['1ICT','1EcE','1PrE','1AME',
                      '2ICT','2EcE','2PrE','2AME',
                      '3IST','3CE','3EcE','3PrE','3AME',
                      '4IST','4CE','4EcE','4PrE','4AME',
                      '5IST','5CE','5EcE','5PrE','5AME',
                      '6IST','6CE','6EcE','6PrE','6AME',
                        ]
   for (var id = 1; id <= rollNumber.length; id++) {
    const roll_No = rollNumber[i]+'-'+ Math.floor(Math.random()*150);
    enrollments.push({
      roll_no: roll_No,
      createdAt: new Date(),
      updatedAt: new Date(),
      major_id: id,
      subject_id: id,
      academic_year_id: id,
      attendance_year_id: id,
    });
  }
  await queryInterface.bulkInsert("enrollments", enrollments, {});
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('enrollments', null, {});
  }
};
