const connection = require("../database/connection");

const getAllNotes = () => {
    return connection.promise().query("SELECT * FROM notes");
};
const createNote = (text) => {
    return connection.promise().query(
        "INSERT INTO notes (text) VALUES (?)",
        [text]
    );
};
const updateNote = (id, text) => {
    return connection.promise().query(
        "UPDATE notes SET text = ? WHERE id = ?",
        [text, id]
    );
};
const deleteNote = (id) => {
    return connection.promise().query(
        "DELETE FROM notes WHERE id = ?",
        [id]
    );
};
module.exports = { getAllNotes, createNote, updateNote, deleteNote };