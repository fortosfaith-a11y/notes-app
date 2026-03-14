const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static("public"))

function readNotes() {
  const data = fs.readFileSync("data/notes.json")
  return JSON.parse(data)
}

function saveNotes(notes) {
  fs.writeFileSync("data/notes.json", JSON.stringify(notes, null, 2))
}

app.get("/notes", (req, res) => {
  const notes = readNotes()
  res.json(notes)
})

app.post("/notes", (req, res) => {
  const notes = readNotes()
  notes.push({
    text: req.body.note,
    createdAt: new Date().toISOString()
  })
  saveNotes(notes)
  res.json({ message: "Note added" })
})

app.delete("/notes/:index", (req, res) => {
  const notes = readNotes()
  notes.splice(req.params.index, 1)
  saveNotes(notes)
  res.json({ message: "Note deleted" })
})

app.put("/notes/:index", (req, res) => {

  const notes = readNotes()

  const index = req.params.index

  notes[index].text = req.body.text

  saveNotes(notes)

  res.json({ message: "Note updated" })

})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})