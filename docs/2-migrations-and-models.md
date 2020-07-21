# Migrations and Models

## Creating Model and Migration at the same time

- by running the following command, it will create `user.js` in `models` folder and `timestamp-create-region.js` in `migrations` folder.
- if you want to specify more than one attribute, you can by putting `,` next to each other like `name:string,description:string`

```
sequelize model:generate --name region --attributes name:string
```

## in `models/region.js`

```
"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class region extends Model {
    static associate(models) {
      // define association here
    }
  }

  region.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "region",
    }
  );

  return region;
};

```

We need to change/add some of the names/fields.

- `region.init( ...` <br>
  `region` has to be changed to `Region` because model name should be `Pascel`.
- `regionId` <br>
- `createdAt` <br>
- `updatedAt`
- We also need to change `model name` and `table name`.

After all these changes and modification has been applied, our model should look like below.

```
"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class region extends Model {
    static associate(models) {
      // define association here
    }
  }

  Region.init(
    {
      regionId: { // <--- JavaScript Object name
        allowNull: false,
        autoIncrement: true,
        field: "region_id", // <--- Column name in db
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "regions",
      modelName: "Regin",
    }
  );

  return Region;
};

```

## in `migrations/20200720172323-create-region.js`

`sequelize` generates contens like below.

```
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('regions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('regions');
  }
};
```

Oh... This is ugly. give some line break.

```
'use strict';
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('regions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('regions');
  }
};
```

This is better.

We need to make some changes in order to match our modified model. After modified, below is the result.

```
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("regions", {
      regionId: { // <---------- new
        allowNull: false,
        autoIncrement: true,
        field: "region_id", // <---------- new
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false, // <---------- new
        type: Sequelize.STRING(30), // <----------new - STRING(30)
      },
      createdAt: {
        allowNull: false,
        field: "created_at", // <---------- new
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at", // <---------- new
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("regions");
  },
};

```

Next, run the following command.

> `sequelize db:migrate`
> This will create `regions` table in the database.
