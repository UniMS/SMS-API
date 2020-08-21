const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

require("./startup/router")(app);
require("./middlewares/error");

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`));
