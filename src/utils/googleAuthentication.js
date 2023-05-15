import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const googleAuthProvider = new GoogleAuthProvider();
export const googleLogin = async () => {
  try {
    await await signInWithPopup(auth, googleAuthProvider);
  } catch (error) {
    console.error(error);
  }
};
