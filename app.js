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





//-----2) Routes-----
//get request sends notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
//get request send index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
//get request send back stored json in db
app.get('/api/v1/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'));
})
//create request
app.post('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));
    const newTitle = notes[notes.length - 1].title + 1;
    const noteLength = notes.length.toString();
    const newNote = Object.assign({ title: newTitle, id: noteLength}, req.body);
    notes.push(newNote);
    fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), err => {
        res.status(201).json({
            status: 'success',
            data: {
                notes: newNote
            }
        })
    })
})












//server
const PORT = process.env.PORt || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
