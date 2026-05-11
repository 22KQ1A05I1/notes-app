import axios from "axios";

const API_URL = "https://notes-app-pqlg.onrender.com/notes";


export const getNotes = () => axios.get(API_URL);

export const addNote = (text) =>
  axios.post(API_URL, { text });

export const deleteNote = (id) =>
  axios.delete(`${API_URL}/${id}`);
