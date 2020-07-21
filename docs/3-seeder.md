# Seeders

After we have build our table, like `regions`, it is time to populate the data with `seeder`.

To create seeder, run the following command,

> `sequelize seed:generate --name region-table-seeder`

Please be careful with naming convention.

Above command will create `seeder` file in `seeders` folder.

## in `seeders/20200720175151-region-table-seeder.js`

```
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  },

  down: async (queryInterface, Sequelize) => {
  }
};
```

After writing seeder,

```
"use strict";

const regions = ["Ayeyarwady", "Yangon", "Mon", "Mandalay", "Shan"].map(
  (region) => {
    return {
      name: region,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("regions", regions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null, {});
  },
};

```

To run the seeder,

> `sequelize db:seed --seed 20200720175151-region-table-seeder`

This will populate the table with initial test data.
