async function getNotes() {

  const response = await fetch("http://localhost:3000/notes")
  const notes = await response.json()

  const list = document.getElementById("notesList")
  list.innerHTML = ""

  notes.forEach((note, index) => {

    const li = document.createElement("li")
    li.textContent = note.text + " (" + new Date(note.createdAt).toLocaleString() + ")"

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"

    deleteBtn.onclick = () => deleteNote(index)

    li.appendChild(deleteBtn)
    list.appendChild(li)


    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"

    editBtn.onclick = async () => {

      const newText = prompt("Edit note:", note.text)

      if (!newText) return

      await fetch(`http://localhost:3000/notes/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: newText })
      })

      getNotes()
    }

    li.appendChild(editBtn)

  })

}

async function addNote() {

  const input = document.getElementById("noteInput")
  const noteText = input.value

  if(noteText === "") return

  await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ note: noteText })
  })

  input.value = ""

  getNotes()

}

async function deleteNote(index) {

  await fetch(`http://localhost:3000/notes/${index}`, {
    method: "DELETE"
  })

  getNotes()

}

getNotes()