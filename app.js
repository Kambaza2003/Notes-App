const express = require("express");

const app = express();

const { notes } = require("./data/notes");

app.use(express.json());

app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.json(notes)
});

app.get("/notes/count", (req, res) => {
    res.json({
        "Number of Notes" : notes.length
    })
})

app.get("/notes/latest", (req, res) => {
    if (notes.length === 0) {
        return res.status(404).send("Notes not found");
    }

    let latestNote = notes[notes.length - 1]; 

    res.json(latestNote);
});

app.get("/notes/characters", (req, res) => {
    let totalCharacters = 0;
    
    for(let i = 0; i < notes.length; i++){
        totalCharacters = totalCharacters + notes[i].text.length;
    }

    res.json({
        charcters: totalCharacters
    });
});

app.get("/notes/search/:text", (req, res) => {
    const text = req.params.text.toLowerCase();

    const note = notes.filter(s => s.text.toLowerCase().includes(text));

    if(note.length === 0) {
        return res.status(404).send("Text Not Found");
    }

    res.json(note)
});

app.get("/notes/latest", (req, res) => {

    if(notes.length === 0){
        return res.status(404).send("Notes not found")
    }

    let latestNotes = notes[-1]; 

    res.json(latestNotes)
});

app.get("/notes/shortest", (req, res) => {

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
})

app.get("/notes/longest", (req, res) => {

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
})

app.get("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(f => f.id === id);

    if(!note) {
        return res.status(404).send("Note not found");
    }

    res.json(note);
});


app.post("/notes", (req, res) => {
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
});

app.put("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const note = notes.find(f => f.id === id);

    if(!note){
        return res.status(404).send("Note not found");
    }

    note.text = req.body.text;

    res.json(note);
});

app.delete("/notes/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = notes.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).send("Note not found");
    }

    notes.splice(index, 1);

    res.json({
        message: "Deleted successfully"
    });

});

app.listen(3000, () => {
    console.log("Server running");
});