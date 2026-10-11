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
        item.append(deleteButton);

        item.classList.add("note-card", `category-${note.category}`);
        notesList.append(item);
    }
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = {
        id: crypto.randomUUID(),
        text: noteInput.value.trim(),
        category: noteCategory.value,
        createdAt: new Date().toLocaleString(),
    };

    notes.push(note);
    noteInput.value = "";
    render();
});

render();