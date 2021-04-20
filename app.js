const express = require('express');
const app = express();
const path = require('path');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




//server
const PORT = process.env.PORt || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
