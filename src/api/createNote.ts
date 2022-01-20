import axios from "axios";
import { NoteBody } from "../types/types";

const createNote = async (body: NoteBody) => {
  try {
    const response = await axios.post("http://localhost:8080/note", body);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export default createNote