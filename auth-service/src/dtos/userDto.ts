import { User } from "../types/UserType";

export default class UserDto{
  id;
  username;

  constructor(model: User){
      this.id = model.id;
      this.username = model.username;
  }
}
