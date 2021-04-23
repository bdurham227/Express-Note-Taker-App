const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


// const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`));

module.exports = (app) => {
    let notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`))

    app.get('/api/notes', (req, res) => res.json(notes))



    app.post('/api/notes', (req, res) => {
        const  noteId  = notes.length;
        const newTitle = req.body.title;
        const newNote = Object.assign({ id: noteId, title: newTitle, text: req.body.text });
        notes.push(newNote);
        fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(notes), err => {
            res.status(201).json({
                status: 'success',
                data: {
                    notes: newNote
                }
            })
        })
    })
    app.delete('/api/notes/:id', (req, res) => {
        fs.readFileSync('db/db.json');
        const deletedNote = notes.find((note) => note.id === Number(req.params.id));

        if (!deletedNote) {
            return res.status(400).json({ 
                status: 'fail',
                message: `could not find find that ${deletedNote}`
            })
        }
        const newNoteDb = notes.filter((note) => note.id !== Number(req.params.id));
        fs.writeFile('db/db.json', JSON.stringify(newNoteDb), err => {
            if (err) throw err;
        })
        return res.sendFile(path.join(__dirname, '/../db/db.json'));
    })









};


