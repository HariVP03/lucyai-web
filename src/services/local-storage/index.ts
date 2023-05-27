import localStorage from "local-storage";

export const storage = {
  get(key: string): any {
    return localStorage(key);
  },
  set(key: string, value: object | string) {
    return localStorage(key, value);
  },
};

export enum StorageKeys {
  messages = "messages",
}
