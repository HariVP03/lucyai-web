import { axios } from "@/services/axios";

export async function sendPrompt(input: string) {
  const { data } = await axios().post("/", {
    prompt: input,
  });

  let result: string = data.front;

  if (data.back?.[0]?.summary) {
    result = data.back.map((item: any) => item.summary).join("\n");
  }

  return result;
}
