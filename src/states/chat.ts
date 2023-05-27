import { StorageKeys, storage } from "@/services";
import { Message } from "@/types/messages";
import { StateCreator } from "zustand";

type State = {
  messages: Message[];
};

type Action = {
  getMessages: () => void;
  addMessage: (message: Message) => void;
};

export type ChatSlice = State & Action;

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  messages: [],

  getMessages() {
    const messages: Message[] = storage.get(StorageKeys.messages) || [];

    const lastMessage: Message | undefined = messages[messages.length - 1];

    if (lastMessage && lastMessage.sender !== "system") {
      messages.push({
        sender: "system",
        message: `Loaded messages of previous chat from ${new Date(
          lastMessage?.sentAt ?? ""
        ).toLocaleString()}`,
        sentAt: new Date().toISOString(),
      });
    }

    set({
      messages: [...messages],
    });
  },

  addMessage(message) {
    set((state) => {
      const newMessages = [
        ...state.messages,
        { ...message, sentAt: new Date().toISOString() },
      ];

      storage.set(StorageKeys.messages, newMessages);

      return {
        messages: newMessages,
      };
    });
  },
});
