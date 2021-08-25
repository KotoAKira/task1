import firebase from "firebase";
import BoardI from "../interfaces/Board";

export const fetchUserName =
  (): Promise<firebase.firestore.DocumentSnapshot> => {
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

export const fetchBoards = (): Promise<firebase.firestore.QuerySnapshot> =>
  firebase.firestore().collection("boards").get({
    source: "server",
  });

export const deleteBoard = (boardId: string): Promise<void> =>
  firebase.firestore().collection("boards").doc(boardId).delete();

export const updateBoard = (boardId: string, board: BoardI): Promise<void> =>
  firebase.firestore().collection("boards").doc(boardId).set(board);
