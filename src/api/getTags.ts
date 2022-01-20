import axios from "axios";

const getTags = async () => {
  try {
    const response = await axios.get("http://localhost:8080/tag");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getTags
