
// const fs = require('fs');
// const path = require('path');

// exports.getAllNotes = (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         results: notes.length,
//         data: {
//             notes
//         }
//     })
// }
// // exports.getOneNote = (req, res) => {
// //     console.log(req.params);
// //     co
// // }


// exports.createNote = (req, res) => {
//     console.log(req.body);
//     let newTitle = notes[notes.length - 1].title + 1;
//     let newNote = Object.assign({ title: newTitle}, req.body);
//     notes.push(newNote);
//     fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 notes: newNote
//             }
//         });
//     });
// }





// // const deleteNotes = (req, res) => {
// //     if (req)
// // }