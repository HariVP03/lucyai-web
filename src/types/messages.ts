export interface Message {
  message: string;
  sender: "user" | "system" | "bot";
  sentAt?: string;
}
