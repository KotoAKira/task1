import Item from "./Item";

export default interface Column {
  id: string;
  columnTitle: string;
  items: Array<Item>;
}
