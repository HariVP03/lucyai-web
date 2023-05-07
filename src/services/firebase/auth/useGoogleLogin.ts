import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "../config";

interface UseGoogleLoginProps {
  onSuccess?: (user: User | null) => void;
}

export function useGoogleLogin(props: UseGoogleLoginProps | undefined = {}) {
  const googleSignin = async () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
      props?.onSuccess?.(res.user);
    });
  };

  return { googleSignin };
}
