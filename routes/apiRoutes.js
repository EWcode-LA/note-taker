const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
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
  app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      notes = JSON.parse(data);
      // notes.push({title:"my test", text:"my text"})
      
    });
    res.json(notes);
  });
  //add post and delete

  // //new object
  //   {
  //     id: <insertId></insertId>
  //     title: req.body.title
  //     text: req.body.text
  //   }

  app.post("/api/notes", function (req, res) {
    let note = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(note);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }

        // notes.push({title:"my test", text:"my text"})
        
        res.send(200);
      }
    );
  });
  //api/notes or ../db/db.json?
  //I want to delete the id
  app.delete("/api/notes/:id", function (req, res) {
    // note.id.length = 0;
    const noteId = req.params.id;
    const noteIndex = notes.findIndex(function (note) {
      return note.id === noteId;
    });
    notes.splice(noteIndex, 1);

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }

        // notes.push({title:"my test", text:"my text"})

        res.send(200);
      }
    );
  });
};
