import ky from "ky";

const api = ky.create({ prefixUrl: "http://localhost:8000" });

export type WordWeight = { word: string; weight: number };

export async function analyze(url: string): Promise<WordWeight[]> {
  const res = await api.post("analyze", { json: { url } }).json<{ words: WordWeight[] }>();
  return res.words;
}
