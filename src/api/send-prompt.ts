import { axios } from "@/services/axios";

export async function sendPrompt(input: string) {
  const { data } = await axios().post("/", {
    prompt: input,
  });

  const summary = data.back.map((item: any) => item.summary).join("\n");

  return summary;
}
// test
