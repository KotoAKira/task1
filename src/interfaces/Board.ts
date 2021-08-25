import Column from "./Column";
import User from "./User";

export default interface Board {
  boardName: string;
  managerUid: string;
  managerName: string;
  columns?: Array<Column>;
  users?: Array<User>;
}
