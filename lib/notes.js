const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
   
   let filteredResults = notesArray;

   if (query.title) {
      filteredResults = filteredResults.filter((note) => note.title === query.title);
   }
   return filteredResults;
}

function findById(id, notesArray) {
   const result = notesArray.filter((note) => note.id === id)[0];
   return result;
}

function createNewNote(body, notesArray) {
   const note = body;
   notesArray.push(note);
   fs.writeFileSync(path.join(__dirname, "../data/notes.json"), JSON.stringify({ notes: notesArray }, null, 2));
   return note;
}

function validateNote(note) {
   if (!note.title || typeof note.title !== "string") {
      return false;
   }
   return true;
}

// delete note
function noteDeleteNote(notesArray, id) {
   let deleteID = parseInt(id);
   notesArray.splice(deleteID, 1);

   // This loop re-writes the indexes for the remaining notes.
   for (let i = deleteID; i < notesArray.length; i++) {
      notesArray[i].id = i.toString();
   }

   fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(
         {
            notes: notesArray,
         },
         null,
         2
      )
   );
}

module.exports = {
   filterByQuery,
   findById,
   createNewNote,
   validateNote,
   noteDeleteNote,
};
