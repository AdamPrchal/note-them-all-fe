import axios from "axios";
import { NoteBody } from "../types/types";

const patchNote = async (body: NoteBody) => {
  try {
    const response = await axios.patch("http://localhost:8080/note", body);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default patchNote;
