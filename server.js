const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let notes = []

app.get("/notes", (req, res) => {
  res.json(notes)
})

app.post("/notes", (req, res) => {
  const note = req.body.note
  notes.push(note)
  res.json({ message: "Note added" })
})

app.delete("/notes/:index", (req, res) => {
  const index = req.params.index
  notes.splice(index, 1)
  res.json({ message: "Note deleted" })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})