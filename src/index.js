const sequelize = require("./database/connection");

const express = require("express");
const app = express();

require("./database/models/academicYear");
require("./database/models/degree");
require("./database/models/ethnicity");
require("./database/models/grade");
require("./database/models/major");
require("./database/models/region");
require("./database/models/religion");
require("./database/models/remark");
require("./database/models/role");
require("./database/models/subject");
require("./database/models/township");
require("./database/models/student");
require("./database/models/exam");
require("./database/models/enrollment");
require("./database/models/course");
require("./database/models/parent");
require("./database/models/examResult");
require("./database/models/grading");

sequelize
  .sync()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on port ${PORT}...`));
