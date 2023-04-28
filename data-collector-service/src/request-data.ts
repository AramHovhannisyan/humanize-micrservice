import axios from "axios";


const requestData = async (url: string) => {
  try {
    const randomTodoId = Math.floor(Math.random() * 200) + 1;
    const { data } = await axios.get(`${url}/${randomTodoId}`);

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default requestData;
