import axios from "axios";

const getNotes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/note");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getNotes
