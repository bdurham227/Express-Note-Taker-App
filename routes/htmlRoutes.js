
const path = require('path');



module.exports = async (app) => {
    try {
        const resFile1 = app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/../public/index.html'));
        })
        const resFile2 = app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '/../public/notes.html'));
        })
        const resFile3 = app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '/../public/index.html'));
        }) 
        const all = await Promise.all([resFile1, resFile2, resFile3]);
      } catch (err) {
          console.error(err)
          throw(err)
          
      }
}