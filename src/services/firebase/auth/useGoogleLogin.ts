import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "../config";
import { useUser } from "@/services/recoil/hooks";

interface UseGoogleLoginProps {
  onSuccess?: (user: User | null) => void;
}

export function useGoogleLogin(props: UseGoogleLoginProps | undefined = {}) {
  const [user, setUser] = useUser();

  const googleSignin = async () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
      setUser(res?.user);
      props?.onSuccess?.(user);
    });
  };

  return { googleSignin: googleSignin, isSignedIn: !!user, user };
}
