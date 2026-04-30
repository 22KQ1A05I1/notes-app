import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const API_URL = "http://localhost:8080/notes";

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!text.trim()) return;

    await axios.post(API_URL, { text });
    setText("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
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
        <button onClick={addNote}>Add</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;