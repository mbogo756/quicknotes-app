const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const notesList = document.querySelector('#notes-list');
const noteCategory = document.querySelector('#note-category');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');

let notes = [];

function render() {
    notesList.textContent = "";

    if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
     } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
     } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
}

    for(const note of notes){
        const item = document.createElement("li");
        const textParagraph = document.createElement("p");
        textParagraph.textContent = note.text;
        item.append(textParagraph);

        const metadata = document.createElement("small");
        metadata.classList.add("note-meta");
        metadata.textContent = `${note.category} · ${note.createdAt}`;
        item.append(metadata);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            notes = notes.filter((existingNote) => existingNote.id !== note.id);
            render();
   });
        item.append(deleteButton);

        item.classList.add("note-card", `category-${note.category}`);
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
    noteInput.value = "";
    render();
});

render();