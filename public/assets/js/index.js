
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === "/notes") {
  noteTitle = document.querySelector(".note-title");
  noteText = document.querySelector(".note-textarea");
  saveNoteBtn = document.querySelector(".save-note");
  newNoteBtn = document.querySelector(".new-note");
  noteList = document.querySelectorAll(".list-container .list-group");
}

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting all notes from the db
const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

// A function for saving a note to the db
const saveNote = (note) =>
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

// A function for deleting a note from the db
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

// A function for editing a note from the db
const editNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    // noteTitle.setAttribute("readonly", true);
    // noteText.setAttribute("readonly", true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.value = "";
    noteText.value = "";
  }
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

  console.log(
    `New Note Added! Title: ${JSON.stringify(
      newNote.title
    )}, Text: ${JSON.stringify(newNote.text)}`
  );

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Edit the clicked note
const handleNoteEdit = (event) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();
  handleNoteView();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  if (activeNote.id === noteId) {
    activeNote = {
      title: noteTitle.value.trim(),
      text: noteText.value.trim(),
    };
  }

  editNote(noteId).then(() => {
    saveNote(activeNote);
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (event) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;
  console.log(`Note Deleted! Note ID: ${noteId}`);

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (event) => {
  activeNote = JSON.parse(event.target.parentElement.getAttribute("data-note"));
  renderActiveNote();
};

// Sets the activeNote to an empty object and allows the user to enter a new note
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();

  if (window.location.pathname === "/notes") {
    noteList.forEach((el) => (el.innerHTML = ""));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement("i");

      delBtnEl.classList.add(
        "fas",
        "fa-trash-alt",
        "float-right",
        "text-danger",
        "delete-note"
      );

      delBtnEl.addEventListener("click", handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi("No saved Notes", false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
  console.log(jsonNotes);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === "/notes") {
  saveNoteBtn.addEventListener("click", handleNoteSave);
  newNoteBtn.addEventListener("click", handleNewNoteView);
  noteTitle.addEventListener("keyup", handleRenderSaveBtn);
  noteText.addEventListener("keyup", handleRenderSaveBtn); 
}
