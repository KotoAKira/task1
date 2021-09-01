import firebase from "firebase";

export const signOut = (): Promise<void> => firebase.auth().signOut();

export const signIn = (
  email: string,
  password: string,
  history: any
): Promise<firebase.auth.UserCredential> =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => history.push("/"));

export const register = (
  email: string,
  password: string,
  name: string,
  secondName: string,
  history: any
): Promise<void> =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res: any) => {
      firebase
        .firestore()
        .collection("users")
        .doc(res.user?.uid)
        .set({ email, name, secondName });
      res.user.sendEmailVerification();
    })
    .then(() => history.push("/confirm"));
