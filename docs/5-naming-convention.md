# Naming Convention

## What are the naming or coding conventions?

Naming or coding conventions are style guidelines for programming. They typically cover the following:

- Naming and declaration rules for variables and functions.
- Rules for the use of white space, indentation, and comments.
- Programming practices and principles.

## Benefits of following naming conventions

Naming or Coding conventions secure quality:

- imporves code readability
- make code maintenance easier
- beautiful and consistent styles of code

In this docs, we are going to state the naming convention we used in this project.

#### JavaScript

| Use case                          | Convention | Example      |
| --------------------------------- | ---------- | ------------ |
| variable name                     | camelCase  | totalCount   |
| function name                     | camelCase  | findAll      |
| class name                        | PascalCase | ExamResult   |
| model name                        | PascalCase | VehicleModel |
| global and constant variable name | UPPERCASE  | PI           |

#### MySQL

| Use case      | Convention          | Example        |
| ------------- | ------------------- | -------------- |
| database name | underscore          | utycc_sms      |
| table name    | plural underscore   | order_items    |
| column name   | singular underscore | father_name_en |

#### File names

| Folder      | Convention         | Example                        |
| ----------- | ------------------ | ------------------------------ |
| controllers | plural camelCase   | examResults.js                 |
| models      | singular camelCase | examResult.js                  |
| middlewares | singular camelCase | catchAsync.js                  |
| routes      | singular camelCase | examResult.js                  |
| migrations  | underscore         | timestamp-create-role.js       |
| seeders     | underscore         | timestamp-role-table-seeder.js |

#### Code Indentation

We use 2 spaces for code indentation.

```javascript
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
```

#### Spaces around operators

We always put spaces around operators ( = + - \* / ), and after commas:

```javascript
const x = y + z;
const values = ["Volvo", "Saab", "Fiat"];
```

#### Code Editors

You can use any code editors or even IDEs of your choice, but we strongly recommand using Miscrosoft Visual Studio Code (VScode).

If you use VScode, you can install following extensions that helps your code clean and indent as you configure.

- [Prettier - Code formatter](https://prettier.io/)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
