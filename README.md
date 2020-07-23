# SMS-API

API for Student Management System

## Project Setup

1. First time ? `git clone https://github.com/UniMS/SMS-API.git` : `git pull`

2. `npm install`

3. `cp .env.example .env` (`cp` means `copy` which **copies** contents of .env.example and **creates** a new file called `.env`.)

4. Fill your database credentials in that `.env` file. Then, you don't need to setup any other things.

5. `sequelize db:migrate`

6. `sequelize db:seed:all`

7. `npm run dev`

## Documentation

- [Migrations and Models](https://github.com/UniMS/SMS-API/blob/master/docs/2-migrations-and-models.md)
- [Seeders](https://github.com/UniMS/SMS-API/blob/master/docs/3-seeder.md)
