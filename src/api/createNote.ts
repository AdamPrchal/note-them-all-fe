import axios from "axios";
import { NoteBody } from "../types/types";

const createNote = async (body: NoteBody) => {
  try {
    const response = await axios.post("http://localhost:8080/note", body);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default createNote;
