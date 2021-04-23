const fs = require('fs');


module.exports = (app) => {
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`))

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
        let noteDb = JSON.parse(fs.readFileSync('db/db.json'));
        let noteId = req.params.id.toString();
        console.log(noteId);

        noteDb = noteDb.filter(note => note.id != noteId);

        fs.writeFile('db/db.json', JSON.stringify(noteDb), err => {
    
            return res.json(noteDb);
        })
    })









};


