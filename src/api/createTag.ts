import axios from "axios";
import { TagBody } from "../types/types";

const createTag = async (body: TagBody) => {
  try {
    const response = await axios.post("http://localhost:8080/tag", body);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default createTag;
