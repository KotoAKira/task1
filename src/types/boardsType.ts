export interface ColumnI {
  id: string;
  columnTitle: string;
  items: Array<ItemI>;
}

export interface ItemI {
  id: string;
  text: string;
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

// eslint-disable-next-line no-shadow
export enum dragStartType {
  dragItem,
  dragColumn,
}
