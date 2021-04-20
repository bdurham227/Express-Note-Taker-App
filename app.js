const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const { RSA_NO_PADDING } = require('constants');

//-----1) Middleware---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//read and parse db.json 
const notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));




//-----2) Routes-----
//get all notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/v1/notes', (req, res) => {
    res.sendFile(paht.join(__dirname, 'db/db.json'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});









//server
const PORT = process.env.PORt || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
