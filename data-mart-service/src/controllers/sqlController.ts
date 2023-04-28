import { KafkaMessage } from "kafkajs";
import { saveData } from "../services/pgService";

const saveMsg = async (data: KafkaMessage) => {
  if (!data.value) {
    return null;
  }

  const dataJson = JSON.parse(data.value.toString());

  const msgSaved = await saveData(dataJson);  

  if (!msgSaved) {
    return null;
  }
  
  return msgSaved;
};

export default saveMsg;

