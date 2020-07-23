# Migrations and Models

## Creating Model and Migration at the same time

If we create a model, sequelize cli automatically creates associated migration for us. So, in this docs, we are going to create **region model and migration** and we will populate our tables with seeders in the [next docs](https://github.com/UniMS/SMS-API/blob/master/docs/3-seeder.md).

*In order to follow this docs, you should have already installed the [sequelize-cli](https://github.com/sequelize/cli).*

Let's run the following command.

```
sequelize model:generate --name region --attributes name:string
```

- by running the above command, it will create `region.js` in `models` folder and `timestamp-create-region.js` in `migrations` folder.
- if you want to specify more than one attribute, you can do so by putting `,` next to each attribute like `name:string,description:string`

Now, let's take a look at what that sequelize-cli gives us in created `models/region.js` file.
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

But, we need to change some of the names and add some fields.
- Model name should be Pascal case. So change `region.init` to `Region.init`.
- We need to add some fields: `regionId`, `createdAt` and `updatedAt`.
- We also need to change `modelName` to `Region` and add `tableName: regions`.

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
      regionId: {
        allowNull: false,
        autoIncrement: true,
        field: "region_id", // column name in physical db
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
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

**sequelize-cli** generates contents like below.
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

This is better. Now, we need to make some changes in order to match our modified model. After modified, below is the result.

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

```
sequelize db:migrate
```

This will create `regions` table with the specified field in the database.
