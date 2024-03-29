# SMS-API

API for Student Management System

## Project Setup

1. First time ? `git clone https://github.com/UniMS/SMS-API.git` : `git pull`

2. `npm install`

3. `cp .env.example .env` (`cp` means `copy` which **copies** contents of .env.example and **creates** a new file called `.env`.)

4. Fill your database credentials and set JWT private key in that `.env` file. Then, you don't need to setup any other things.

5. `sequelize db:migrate`

6. `sequelize db:seed:all`

7. Create `/public/images/history/` & `/public/images/present/` inside the root of the folder.
   In Linux and Mac, you can run the following command.

   `mkdir -p /public/images/history/` and also `mkdir -p /public/images/present`.

8. `npm run dev`

## Note

Currently, you will need to register/login to test APIs. To do so -

1. Hit `POST /users` with `official` role id `1`. (You can also see the AUTH routes in Postman Team.).

2. It will register the user, assuming that you provide the valid username and password and return the response with the header containing `x-auth-token`.

3. Grab the token and paste it in `header` section of the route you are trying to hit, with the key `x-auth-token` and value `token`.

## Documentation

- [Migrations and Models](https://github.com/UniMS/SMS-API/blob/master/docs/2-migrations-and-models.md)
- [Seeders](https://github.com/UniMS/SMS-API/blob/master/docs/3-seeder.md)
- [APIs](https://github.com/UniMS/SMS-API/blob/master/docs/4-api.md)
- [Naming Conventions](https://github.com/UniMS/SMS-API/blob/master/docs/5-naming-convention.md)
