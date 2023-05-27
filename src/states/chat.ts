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

    set({
      messages: [...messages],
    });
  },

  addMessage(message) {
    set((state) => {
      const newMessages = [...state.messages];

      const lastMessage = newMessages[newMessages.length - 1];

      if (
        !lastMessage.sentAt ||
        (lastMessage.sender !== "system" &&
          new Date(lastMessage.sentAt).getDate() !== new Date().getDate())
      ) {
        newMessages.push({
          message: `${new Date().toLocaleDateString()}`,
          sentAt: new Date().toISOString(),
          sender: "system",
        });
      }

      newMessages.push({ ...message, sentAt: new Date().toISOString() });

      storage.set(StorageKeys.messages, newMessages);

      return {
        messages: newMessages,
      };
    });
  },
});
