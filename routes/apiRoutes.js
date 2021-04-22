const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`));

module.exports = (app) => {
    // app.get('/api/notes', (req, res) => {
    //     res.status(200).json({
    //         status: 'success',
    //         results: notes.length,
    //         data: {
    //             notes
    //         }
    //     })
    // });
    app.get('/api/notes', (req, res) => res.json(notes))


    // app.get('/api/notes/:id', (req, res) => {

    // })



    // app.post('/api/notes', (req, res) => {
    //     // const newTitle = notes[notes.length -1 ].title + 1;
    //     // const newId = uuid.v4();
    //     try {
    //         // req.body.id = notes.length;
    //         // const notesId = req.body.id;
    //         const newNote = Object.assign({ id: uuid.v4(), title: req.body.title, text: req.body.text });
    //         notes.push(newNote);
    //         fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(notes), err => {
    //             res.status(200).json({
    //                 status: 'success',
    //                 data: {
    //                     notes: newNote
    //                 }
    //             });
    //         })
    //     } catch(err){
    //         console.log(err)
    //     }
       
    // })

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






//   app.delete('/api/notes/:id', (req, res) => {
//       try {
//         fs.readFileSync('db/db.json');
//     //   const foundNote = notes.some(note => note.id === req.params.id);
//     const foundNote = req.params.id;
//       console.log(foundNote);

//         if (foundNote) {
//             let newNoteArray = notes.filter(note => note.id === req.params.id)
//             console.log(newNoteArray)
//             fs.writeFile('db/db.json', JSON.stringify(newNoteArray), err => {
//                 if (err) throw (err)
//                 console.log('saved');
//             });
//         } else {
//             res.status(400)
//         }
//         return res.sendFile(path.join(__dirname, 'db/db.json'))
        

//       } catch (err) {
//           console.error(err);
//           throw(err)
//       }
//   });
   
    //    




};
