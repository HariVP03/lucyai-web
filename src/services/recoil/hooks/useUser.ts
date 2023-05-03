import { useRecoilState } from "recoil";
import { userAtom } from "../atoms";
import { User } from "firebase/auth";

export function useUser() {
  return useRecoilState<User | null>(userAtom);
}
