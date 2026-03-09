let notes = JSON.parse(localStorage.getItem("notes")) || []

function renderNotes() {

  const list = document.getElementById("notesList")
  list.innerHTML = ""

  notes.forEach((note, index) => {

    const li = document.createElement("li")
    li.textContent = note

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"

    deleteBtn.onclick = function() {
      deleteNote(index)
    }

    li.appendChild(deleteBtn)
    list.appendChild(li)

  })

}

function addNote() {

  const input = document.getElementById("noteInput")
  const noteText = input.value

  if(noteText === "") return

  notes.push(noteText)

  localStorage.setItem("notes", JSON.stringify(notes))

  input.value = ""

  renderNotes()

}

function deleteNote(index) {

  notes.splice(index, 1)

  localStorage.setItem("notes", JSON.stringify(notes))

  renderNotes()

}

renderNotes()