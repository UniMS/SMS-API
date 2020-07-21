# Seeders

After we have build our table, like `regions`, it is time to populate the data with `seeder`.

To create seeder, run the following command,

> `sequelize seed:generate --name region-table-seeder`

Please note the naming convention. `<table_name-table-seeder>`

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

After writing seeder, it will look like below:

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
    await queryInterface.sequelize.query(
      "ALTER TABLE roles AUTO_INCREMENT = 1;"
    ); // <-- to avoid foreign_key constraints

    await queryInterface.bulkInsert("regions", regions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null);
  },
};

```

To run the seeder,

> `sequelize db:seed --seed 20200720175151-region-table-seeder`

This will populate the table with initial test data.

# Useful Command

0. Create seeders **as sorted in migrations** because of foreign keys constraints. Otherwrise, seeders are not goning work properly.

1. Create a seeder:

```
sequelize seed:generate --name table_name-table-seeder
```

...

2. Write your seeder.

...

3. Delete previous seeder data.

```
sequelize db:seed:undo:all
```

4. Run your new seeder.

```
sequelize db:seed:all
```
