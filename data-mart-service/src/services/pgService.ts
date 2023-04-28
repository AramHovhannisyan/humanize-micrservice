import sql from "../db/connect";
import { producedMsgType } from '../types/producedMessage';

const saveData = async (msg: producedMsgType) => {
  try {
    if (!msg.count) {
      console.log('Required count missing');
      return null;
    }

    const count = Number(msg.count);

    const dataSaved = await sql`UPDATE data SET todos_count=${count}`;

    if (!dataSaved.count) {
      return null;
    }

    return dataSaved;
  } catch (error) {
    console.error(error);
  }

};

const getTodosCount = async () => {
  try {
    const dataSaved = await sql`SELECT todos_count FROM data`;
    if(!dataSaved.count) {
      return 0;
    }

    return dataSaved[0].todos_count;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { saveData, getTodosCount };