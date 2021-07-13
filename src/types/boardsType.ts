export interface ColumnI {
  id: string;
  columnTitle: string;
  items: Array<ItemI>;
}

export interface ItemI {
  id: string;
  title: string;
  content: string;
}

export interface BoardI {
  boardName: string;
  managerUid: string;
  managerName: string;
  columns?: Array<ColumnI>;
  users?: Array<UserI>;
}

export interface UserI {
  uid: string;
  name: string;
}
