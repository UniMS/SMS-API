require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const logger = require('./startup/logger')();
app.use(morgan('combined', { stream: logger.stream }));

require('./startup/jwt')();
require('./startup/router')(app);
require('./middlewares/error')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`));
