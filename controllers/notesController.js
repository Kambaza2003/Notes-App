const { getAllNotes, createNote: createNoteModel, updateNote: updateNoteModel, deleteNote: deleteNoteModel, getNoteById: getNoteByIdModel, latestNote: latestNoteModel, shortestNote: shortestNoteModel, longestNote: longestNoteModel, totalCharacters: totalCharactersModel, searchNotes: searchNotesModel } = require("../models/noteModel");

const getNotes = async (req, res) => {
    try{
        const [rows] = await getAllNotes();

        res.json(rows);

    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const createNote = async (req, res) => {
    try{ 
        const text = req.body.text;

        await createNoteModel(text);

        res.status(201).json({
            message: "Note created successfully"
        });
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }

};

const updateNote = async (req, res) => {
    try{

        const id = parseInt(req.params.id);

        const text = req.body.text;

        const [result] = await updateNoteModel(id, text);
        if (result.affectedRows === 0){
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.json({
            message: "Note updated successfully"
        });
   }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const [rows] = await getNoteByIdModel(id)

        res.json(rows);
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const totalCharacters = async (req, res) => {
    try{
        const characters = await totalCharactersModel()

        res.json({
            characters: characters
        });
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const searchNotes = async (req, res) => {
    try {
        const text = req.params.text.toLowerCase();

        const note = await searchNotesModel(text)

        res.json(note)
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const latestNote = async (req, res) => {
    try {
        const [rows] = await latestNoteModel(); 

        res.json(rows)
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const shortestNote = async (req, res) => {
   try {
        const [rows] = await shortestNoteModel();

        res.json(rows)
   }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const longestNote = async (req, res) => {
    try {
        const [rows] = await longestNoteModel()

        res.json(rows)
    }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


const deleteNote = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const [result] = await deleteNoteModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        return res.json({
            message: "Note successfully deleted"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    getNotes,
    getNoteById,
    latestNote,
    longestNote,
    shortestNote,
    totalCharacters,
    searchNotes,
    createNote,
    updateNote,
    deleteNote
};