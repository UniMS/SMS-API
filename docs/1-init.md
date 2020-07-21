# Initialization the project

Host Address - https://github.com/UniMS/SMS-API <br>
(This is the private repo. If you are not at the github origanization, you can't access it. Please contact the contributers.)

### 1 - To run the project, first clone the repo.

> `git clone https://github.com/UniMS/SMS-API`

### 2 - To install the dependencies, run

> `npm install`.

### 3 - Create the database: whatever the name is.

> `mysql -u <username> -p <password>`

> `create database <database>`

### 4 - Connect to the database. In your project folder, run the following command.

> `cp .env.example .env`

and fill up with your information.

### 5 - Run migrations. This will create tables in the database.

> `sequelize db:migrate`

### 6 - Run seeders. This will populate tables with initial test data.

> `sequelize db:seed:all`

### 7 - Run the project.

> `npm run dev`
