const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const notesList = document.querySelector('#notes-list');
const noteCategory = document.querySelector('#note-category');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const clearAllButton = document.querySelector("#clear-all-btn");

let notes = JSON.parse(localStorage.getItem("quicknotes-notes") || "[]");

function saveNotes() {
    localStorage.setItem("quicknotes-notes", JSON.stringify(notes));
}

function render() {
    notesList.textContent = "";

    if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
     } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
     } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
     }

    const searchText = searchInput.value.trim().toLowerCase();

    const matchingNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(searchText)
 );

    if (searchText !== "" && matchingNotes.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.append(message);
}

        for (const note of matchingNotes) {
        const item = document.createElement("li");
        item.classList.add("note-card", `category-${note.category}`);

        const textParagraph = document.createElement("p");
        textParagraph.textContent = note.text;

        const metadata = document.createElement("small");
        metadata.classList.add("note-meta");
        metadata.textContent = `${note.category} · ${note.createdAt}`;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            notes = notes.filter((existingNote) => existingNote.id !== note.id);
            saveNotes();
            render();
        });

        item.append(textParagraph, metadata, deleteButton);
        notesList.append(item);
    }
}


noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();

    if (text.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    return;
}

   if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
}

   errorMessage.textContent = "";

    const note = {
        id: crypto.randomUUID(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString(),
    };

    notes.push(note);
    saveNotes();
    noteInput.value = "";
    render();
});

searchInput.addEventListener("input", render);
clearAllButton.addEventListener("click", () => {
    if (confirm("Delete all notes?")) {
        notes = [];
        saveNotes();
        render();
    }
});
render();