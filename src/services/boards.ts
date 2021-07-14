import firebase from "firebase";
import { BoardI } from "../types/boardsType";

export const fetchUserName = () => {
  const userUid: string = firebase.auth().currentUser!.uid;
  return firebase.database().ref().child("users").child(userUid).once("value");
};

export const createBoard = (
  boardName: string,
  managerUid: string,
  managerName: string
) => {
  const database = firebase.database().ref().child("boards");
  return database.push({ boardName, managerUid, managerName });
};

export const fetchBoards = () =>
  firebase.database().ref().child("boards").once("value");

export const deleteBoard = (boardId: string) =>
  firebase.database().ref().child("boards").child(boardId).remove();

export const updateBoardName = (boardId: string, boardName: string) =>
  firebase
    .database()
    .ref()
    .child("boards")
    .child(boardId)
    .update({ boardName });

export const updateBoard = (boardId: string, board: BoardI) =>
  firebase.database().ref().child("boards").child(boardId).set(board);
