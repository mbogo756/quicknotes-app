# QuickNotes

QuickNotes is a note-taking app built with HTML, CSS and JavaScript.
It lets users organise notes into Personal, Work and Study categories,
search their notes and keep them after refreshing the page.

## Features

- Add notes with a category and creation date.
- Delete individual notes.
- Search notes without case sensitivity.
- Reject empty notes and notes over 200 characters.
- Display the total number of notes.
- Save notes in localStorage.
- Adapt the layout to mobile screens.

## How to run locally

1. Clone the repository:
   `git clone https://github.com/mbogo756/quicknotes-app.git`
2. Open the quicknotes-app folder in VS Code.
3. Start a local preview server, such as Live Server.
4. Open index.html through that server.

## What I learned

- localStorage retains notes that would otherwise be lost after a page refresh. JSON.stringify and JSON.parse let me save and restore an array of note objects.
- createElement creates HTML elements from JavaScript, while textContent displays the note text as plain text.
- Event listeners respond to form submissions, Delete button clicks and typing in the search field.
- filter creates a new array, which I used to find matching notes and remove a note by its ID.
- trim removes spaces from the beginning and end of text, allowing me to reject notes containing only spaces.
- A render function keeps the displayed list and note count in sync with the notes array.