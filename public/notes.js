const notesContainer = document.querySelector('.notes-container');
const addNoteBtn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

async function showNotes(){
    const response = await fetch("/notes");

    const notes = await response.json();
    notesContainer.innerHTML = "";

    notes.forEach(note => {

    let inputBox = document.createElement("p");

    let img = document.createElement("img");

    inputBox.className = "input-box relative w-full max-w-[500px] min-h-[150px] bg-white text-gray-700 p-5 my-5 rounded-md outline-none";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.dataset.id = note.id;
    inputBox.addEventListener("keydown", async (e) => {
        
        if(e.key === "Enter"){

            e.preventDefault();

            const id = inputBox.dataset.id;
            const text = inputBox.textContent;

            await fetch(`/notes/${id}`, {
                method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    text
                })
            });

            await showNotes();

        }

    });
    inputBox.textContent = note.text;

    img.src = "images/delete.png" 
    img.className = "absolute bottom-4 right-4 w-6 cursor-pointer"

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    });

   console.log(notes)
}
showNotes();
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

addNoteBtn.addEventListener("click", async () => {

    const text = prompt("Enter your note:");

    if (!text) {
        return
    }

    const response = await fetch("/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text
        })
    });

    await response.json();

    showNotes();

});

notesContainer.addEventListener('click', async (e) => {
    if (e.target.tagName === 'IMG'){
        const id = e.target.parentElement.dataset.id;

    await fetch(`/notes/${id}`, {
        method: "DELETE"
    });

    await showNotes();
    }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
        document.execCommand('insertLineBreak');
        e.preventDefault();
    };
});