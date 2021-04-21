const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");


//-----1) Middleware---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);





//server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
