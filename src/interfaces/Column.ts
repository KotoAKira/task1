import ItemI from "./Item";

export default interface ColumnI {
  id: string;
  columnTitle: string;
  items: Array<ItemI>;
}
