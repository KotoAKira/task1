import firebase from "firebase";
import { BoardI } from "../types/boardsType";

export const fetchUserName = () => {
  const userUid: string = firebase.auth().currentUser!.uid;
  return firebase.firestore().collection("users").doc(userUid).get();
};

export const createBoard = (
  boardName: string,
  managerUid: string,
  managerName: string
): Promise<firebase.firestore.DocumentReference> => {
  const database = firebase.firestore().collection("boards");
  return database.add({ boardName, managerUid, managerName });
};

export const fetchBoards = () =>
  firebase.firestore().collection("boards").get();

export const deleteBoard = (boardId: string): Promise<any> =>
  firebase.firestore().collection("boards").doc(boardId).delete();

export const updateBoard = (boardId: string, board: BoardI): Promise<any> =>
  firebase.firestore().collection("boards").doc(boardId).set(board);
