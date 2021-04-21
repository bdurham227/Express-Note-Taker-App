const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const uuid = require("uuid");
const apiRoutes = require("./routes/apiRoutes");

//-----1) Middleware---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//read and parse db.json

// const notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));
// console.log(notes);

// app
// //-----2)html Routes-----
// //get request sends notes.html
// // app.get('/notes', (req, res) => {
// //     res.sendFile(path.join(__dirname, '/public/notes.html'));
// // });
// // //get request send index.html
// // app.get('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, '/public/index.html'));
// // });

// // //get request send back stored json in db
// // app.get('/notes/:id', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'db/db.json'));
// // })
// // app.post('/notes', (req, res) => {
// //     let newNote = req.body;
// //     notes.push(newNote)
// //     fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), err => {
// //         res.json(newNote);
// //     })
// // })
// //create request
// app.post('/notes', (req, res) => {
//     const notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));
//     // const newTitle = notes[notes.length - 1].title + 1;
//     const noteLength = notes.length;
//     const newNote = Object.assign({id: noteLength}, req.body);
//     notes.push(newNote);
//     fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 notes: newNote
//             }
//         })
//     })
// })
// //delete note request
// app.delete('/api/v1/notes/:id', (req, res) => {
//     let notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));
//     const id = req.params.id * 1;
//     // const note = notes.find(el => el.id === id)
//     if(req.params.id * 1 > notes.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     notes = notes.find(el => {
//         return el.id != id;
//     })

//     fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), err => {
//         res.json(notes)
//      })

// })
//html routes
//get notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
//get one note
app.get("notes/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

//get home
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//api routes
//all notes
app.get("/notes", (req, res) => {
  console.log("hi from get");
  res.status(200).json({
    status: "sucess",
    results: notes.length,
    data: {
      notes,
    },
  });
});
//one note
app.get("/notes/:id", (req, res) => {
  console.log(req.params);
  res.json();
});

app.post("/notes", (req, res) => {
  // const newTitle = notes[notes.length - 1].title + 1;
  const notes = JSON.parse(fs.readFileSync(`${__dirname}/db/db.json`));
  const newTitle = req.body.title;
  const newNote = Object.assign({ title: newTitle, id: uuid.v4() }, req.body);
  notes.push(newNote);

  fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        notes: newNote,
      },
    });
  });
});

//server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
