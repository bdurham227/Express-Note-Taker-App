//require fs to read/write to get data from db.json and be able to to write new post requests via file system
const fs = require('fs');


module.exports = (app) => {
    //read db/db.json and parse data thats being stored and store to a variable
    const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`))
    //get request that returns all data stored in the db and format it with json
    app.get('/api/notes', (req, res) => res.json(notes))

    //make a post request to add a new note to the database.
    //create an key/value pairs for a new note and used Object.assign() to easily create an object
    app.post('/api/notes', (req, res) => {
        let noteId  = notes.length;
        let newTitle = req.body.title;
        // const newNote = Object.assign({ id: noteId, title: newTitle, text: req.body.text });
        let newNote = {
            id: noteId,
            title: newTitle,
            text: req.body.text
        }
        //push new note into db.json array of objects
        notes.push(newNote);
        //write new note to db.json file
        fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(notes), () => {
            // res.status(201).json({
            //     status: 'success',
            //     data: {
            //         notes: newNote
            //     }
            // })
        })
        return res.json(notes.slice(-1));
    })
    
    //still feels broken ish? in its current state parse data stored in db.json and uses toString() method bc without it, a data buffer is returned
    //then we use array method filter to filter out the id of the note selected to be deleted and store that in variable
    //which we can then use writeFile to write our new data to db.json
    app.delete('/api/notes/:id', (req, res) => {
        let noteDb = JSON.parse(fs.readFileSync('db/db.json'));
        let noteId = req.params.id.toString();
        // console.log(noteId);

        noteDb = noteDb.filter(note => note.id != noteId);
        // noteDb = noteDb.splice(note => note.id != noteId);


        fs.writeFile('db/db.json', JSON.stringify(noteDb), err => {
    
        })
        res.json(noteDb);
    })









};


