# Seeders

After we have built the `region` table, it is time to populate the data with `seeder`.

To create seeder, run the following command,

```console
sequelize seed:generate --name region-table-seeder
```

Please note the naming convention. `<table_name-table-seeder>` Above command will create a `timestamp-region-table-seeder` file in `seeders` folder.

## in `seeders/20200720175151-region-table-seeder.js`

```javascript
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  },

  down: async (queryInterface, Sequelize) => {
  }
};
```

After writing seeder, it will look like below:

```javascript
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
    ); // to avoid foreign_key constraints

    await queryInterface.bulkInsert("regions", regions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null);
  },
};
```

To run the seeder,

```javascript
sequelize db:seed --seed 20200720175151-region-table-seeder
```

This will populate the table with initial test data.

# Useful Command

### Creating a seeder

1. !important. Create seeders **as sorted in migrations** because of foreign keys constraints. Otherwrise, seeders are not goning to work properly.

2. Create a seeder:

```console
sequelize seed:generate --name table_name-table-seeder
```

3. Write your seeder.

### Using seeder

4. Delete previous seeder data.

```console
sequelize db:seed:undo:all
```

5. Run all previous seeders and that new seeder.

```console
sequelize db:seed:all
```
