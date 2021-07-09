import firebase from "firebase";

export const signOut = () => firebase.auth().signOut();

export const signIn = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const register = (
  email: string,
  password: string,
  name: string,
  secondName: string
) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res: any) => {
      firebase
        .database()
        .ref()
        .child("users")
        .child(res.user.uid)
        .set({ email, name, secondName });
      res.user.sendEmailVerification();
    });
