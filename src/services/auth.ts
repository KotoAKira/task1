import firebase from "firebase";

export const signOut = (): Promise<void> => firebase.auth().signOut();

export const signIn = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const register = (
  email: string,
  password: string,
  name: string,
  secondName: string
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
    });
