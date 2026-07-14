const express = require("express");

const notesRoutes = require("./routes/notesRoutes");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use("/", notesRoutes);

app.listen(3000, () => {
    console.log("Server running");
});