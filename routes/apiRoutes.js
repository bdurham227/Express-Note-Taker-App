const fs = require('fs');
const uuid = require('uuid');


const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`));

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(notes));


    // app.get('/api/notes/:id', (req, res) => {
    //     console.log(req.params);
    //     const id = req.params.id;
    //     const note = notes.filter(el => el.id === id);

    //     if (!note) {
    //         return res.status(404).json({
    //             status: 'fail',
    //             message: 'Invalid ID'
    //         })
    //     }
    //     res.status(200).json({
    //         status: 'success',
    //         data: {
    //             note
    //         }
    //     })
    // });



    app.post('/api/notes', (req, res) => {
        // const newTitle = notes[notes.length -1 ].title + 1;
        // const newId = uuid.v4();
        try {
            const newNote = Object.assign({ id: uuid.v4(), title: req.body.title, text: req.body.text });
            notes.push(newNote);
            fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), err => {
                res.status(200).json({
                    status: 'success',
                    data: {
                        notes: newNote
                    }
                });
            })
        } catch(err){
            console.log('error!')
        }
       
    })

  app.delete('/api/notes/:id', (req, res) => {
      const foundNote = notes.some(note => note.id == req.params.id);

      if (foundNote) {
        res.status(204).json({
            status: 'success',
            message: 'Note Deleted',
            notes: notes.filter(note => note.id != req.params.id)
        })
      } else {
          res.status(404).json({
              status: 'fail',
              message: `No note with the id of ${req.params.id}`
          });
      }
  })





}
