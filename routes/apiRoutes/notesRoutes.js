const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNote, noteDeleteNote } = require("../../lib/notes");
const { notes } = require("../../data/db");

router.get("/notes", (req, res) => {
   let results = notes;
   if (req.query) {
      results = filterByQuery(req.query, results);
   }
   res.json(results);
});

router.get("/notes/:id", (req, res) => {
   const result = findById(req.params.id, notes);
   if (result) {
      res.json(result);
   } else {
      res.send(404);
   }
});

router.post("/notes", (req, res) => {
   // set id based on what the next index of the array will be
   req.body.id = notes.length.toString();

   if (!validateNote(req.body)) {
      res.status(400).send("The Note is not properly formatted.");
   } else {
      const Note = createNewNote(req.body, notes);
      res.json(Note);
   }
});

// delete notes
router.delete("/notes/:id", (req, res) => {
   noteDeleteNote(notes, req.params.id);
   res.json(notes);
});

module.exports = router;
