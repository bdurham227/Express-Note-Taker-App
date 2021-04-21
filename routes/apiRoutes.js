const fs = require('fs');
const uuid = require('uuid');
const express = require('express');

const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`));

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(notes));

    app.post('/api/notes', (req, res) => {
        const newTitle = notes[notes.length -1 ].title + 1;
        const newId = uuid.v4();
        const newNote = Object.assign({ title: newTitle, id: newId }, req.body);
        notes.push(newNote);
        fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), err => {
            res.status(200).json({
                status: 'success',
                data: {
                    notes: newNote
                }
            });
        });
    })
}
