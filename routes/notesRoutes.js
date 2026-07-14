const express = require("express");
const router = express.Router();
const {
    getNotes,
    latestNote,
    totalCharacters,
    searchNotes,
    shortestNote,
    longestNote,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/notesController");

router.get("/notes", getNotes);
router.get("/notes/latest", latestNote);
router.get("/notes/characters", totalCharacters);
router.get("/notes/search/:text", searchNotes);
router.get("/notes/shortest", shortestNote);
router.get("/notes/longest", longestNote);
router.get("/notes/:id", getNoteById);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);


module.exports = router;