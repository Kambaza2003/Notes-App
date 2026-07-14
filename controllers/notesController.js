const { getAllNotes } = require("../models/noteModel");

const getNotes = async (req, res) => {

    const [rows] = await getAllNotes();

    res.json(rows);
};

const getNoteById = (req, res) => {

    const id = parseInt(req.params.id);

    const note = notes.find(f => f.id === id);

    if (!note) {
        return res.status(404).send("Note not found");
    }

    res.json(note);

};

const totalCharacters = (req, res) => {
    let totalCharacters = 0;
    
    for(let i = 0; i < notes.length; i++){
        totalCharacters = totalCharacters + notes[i].text.length;
    }

    res.json({
        charcters: totalCharacters
    });
}

const searchNotes = (req, res) => {
    const text = req.params.text.toLowerCase();

    const note = notes.filter(s => s.text.toLowerCase().includes(text));

    if(note.length === 0) {
        return res.status(404).send("Text Not Found");
    }

    res.json(note)
}

const latestNote = (req, res) => {

    if(notes.length === 0){
        return res.status(404).send("Notes not found")
    }

    let latestNotes = notes[notes.length - 1]; 

    res.json(latestNotes)
}

const shortestNote = (req, res) => {

    if(notes.length === 0){
        return res.status(404).send("Notes not found")
    }

    let shortestNotes = notes[0];

    for (let i = 0; i < notes.length; i++){
        if(notes[i].text.length < shortestNotes.text.length){
            shortestNotes = notes[i];
        }
    }

    res.json(shortestNotes)
}

const longestNote = (req, res) => {

    if(notes.length === 0){
        return res.status(404).send("Notes not found")
    }

    let longestNotes = notes[0];

    for (let i = 0; i < notes.length; i++){
        if(notes[i].text.length > longestNotes.text.length){
            longestNotes = notes[i];
        }
    }

    res.json(longestNotes)
}

const createNote = (req, res) => {
    const newNote = {

        id: notes.length + 1,
        text: req.body.text
    }

    if(!notes){
        return res.status(404).send("Notes does not exist")
    }

    notes.push(newNote);

    res.status(201).send("New note created")

    res.json(newNote); 
}


const updateNote = (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(f => f.id === id);

    if(!note){
        return res.status(404).send("Note not found");
    }

    note.text = req.body.text;

    res.json(note);
}

const deleteNote = (req, res) => {

    const id = parseInt(req.params.id);

    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).send("Note not found");
    }

    notes.splice(index, 1);

    res.json({
        message: "Deleted successfully"
    });

}

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