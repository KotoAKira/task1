import ColumnI from "./Column";
import UserI from "./User";

export default interface BoardI {
  boardName: string;
  managerUid: string;
  managerName: string;
  columns?: Array<ColumnI>;
  users?: Array<UserI>;
}
