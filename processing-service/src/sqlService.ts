import sql from "./db/connect";
import { todoItemType } from "./types";

const saveTodoItem = async (item: todoItemType) => {
  try {
    const { userId, id: todoId, title, completed } = item;

    if (!userId) {
      console.log('No userId in', item);
      
      return null;
    }

    if (!todoId) {
      console.log('No todoId in', item);
      
      return null;
    }

    if (!title) {
      console.log('No title in', item);
      
      return null;
    }

    if (completed === undefined) {
      console.log('No completed', item);
      
      return null;
    }

    const msgSaved = await sql`INSERT INTO todos (title, todo_id, user_id, completed) values (${title}, ${todoId}, ${userId}, ${completed}) returning *`;
    
    if (!msgSaved.count) {
      return null;
    }
    
    return msgSaved.count;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTodoItemsCount = async () => {
  try {
    const todos = await sql`SELECT count(id) FROM todos`;

    if (!todos.count) {
      return null;
    }
    
    return todos[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { saveTodoItem, getTodoItemsCount };