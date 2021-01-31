const fs = require('fs');
const path = require('path');

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    let notes = [];

    // fs.readFile(path.join(__dirname, "./db/db.json"), 'utf8' , (err, data) => {
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
    //   notes = JSON.parse(data);
    //   // notes.push({title:"my test", text:"my text"})
    //   console.log(notes);
    // })
    app.get("/api/notes", function(req, res) {
      fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        notes = JSON.parse(data);
        // notes.push({title:"my test", text:"my text"})
        console.log(notes);
      })
      res.json(notes);
    });
}

//add post and delete