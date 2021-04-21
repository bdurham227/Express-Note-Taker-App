const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const uuid = require("uuid");
const apiRoutes = require("./routes/apiRoutes");

//-----1) Middleware---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// const notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));



//server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
