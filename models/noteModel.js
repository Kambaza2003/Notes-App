const connection = require("../database/connection");

const getAllNotes = () => {
    return connection.promise().query("SELECT * FROM notes");
};

module.exports = { getAllNotes };