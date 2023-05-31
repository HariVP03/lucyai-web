import { axios } from "@/services/axios";

export async function sendPrompt(input: string) {
  const { data } = await axios().post("/", {
    prompt: input,
  });

  let final = data?.front;

  if (data?.back?.[0]?.summary) {
    final = data.back?.map((item: any) => item.summary).join("\n");
  }

  return final;
}
