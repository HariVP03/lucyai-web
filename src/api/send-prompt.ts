import { axios } from "@/services/axios";

export async function sendPrompt(input: string) {
  return await axios().post("/", {
    prompt: input,
  });
}
