import { getTodoItemsCount, saveTodoItem } from "./sqlService";
import { todoItemType } from "./types";

const saveMsg = async (dataJson: todoItemType) => {
  const msgSaved = await saveTodoItem(dataJson);  

  if (!msgSaved) {
    return null;
  }
  
  return msgSaved;
};

const getCount = async () => {
  const todos = await getTodoItemsCount();  

  if(!todos) {
    return null;
  }

  return todos.count;
};

export { saveMsg, getCount };
