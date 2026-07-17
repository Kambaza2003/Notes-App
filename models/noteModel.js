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

const getNoteById = (id) => {
    return connection.promise().query(
        "SELECT * FROM notes WHERE id = ?",
        [id]
    );
};

const latestNote = () => {
    return connection.promise().query(
        "SELECT * FROM notes ORDER BY id DESC LIMIT 1;"
    );
};

const longestNote = () => {
    return connection.promise().query(
        "SELECT * FROM notes ORDER BY CHAR_LENGTH(text) DESC LIMIT 1;"
    );
};

const shortestNote = () => {
    return connection.promise().query(
        "SELECT * FROM notes ORDER BY CHAR_LENGTH(text) ASC LIMIT 1;"
    );
};

const totalCharacters = () => {
    return connection.promise().query(
        "SELECT SUM(CHAR_LENGTH(text)) FROM notes;"
    );
};

const searchNotes = () => {
    return connection.promise().query(
        "SELECT * FROM notes WHERE text LIKE ?",
        [`%${text}%`]
    );
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote, getNoteById, latestNote, shortestNote, totalCharacters, searchNotes, longestNote };