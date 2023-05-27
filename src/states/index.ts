import { create } from "zustand";
import { ChatSlice, createChatSlice } from "./chat";

type State = ChatSlice;

export const useStore = create<State>((...a) => ({
  ...createChatSlice(...a),
}));
