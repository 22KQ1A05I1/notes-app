import { useEffect, useState } from "react";
import "./App.css";

import {
  getNotes,
  addNote,
  deleteNote,
} from "./services/api";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  const handleAddNote = async () => {
    if (!text.trim()) return;

    await addNote(text);
    setText("");
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1>Notes App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleAddNote}>
          Add
        </button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}

            <button
              onClick={() =>
                handleDeleteNote(note.id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
