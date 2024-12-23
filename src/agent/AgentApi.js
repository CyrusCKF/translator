import Ollama from "ollama/browser";

export async function getAllModels() {
  await delay(1000);
  return await Ollama.list().then(
    (response) => {
      return response.models.map((e) => e.name);
    },
    (error) => {
      console.error(error);
    }
  );
}

export async function* translate({ text, model, from, to } = {}) {
  await delay(1000);
  const prompt = `Translate the following text from ${from} to ${to}. Reply only the translated text.\n\n${text}`;
  const generateResponse = await Ollama.generate({
    model: model,
    prompt: prompt,
    stream: true,
  });
  for await (const res of generateResponse) {
    if (res.response != null) yield res.response;
  }
}

export async function calculateSimilarity({
  text1,
  text2,
  language1,
  language2,
  model,
} = {}) {
  const backResponse = translate({
    text: text2,
    model: model,
    from: language2,
    to: language1,
  });
  let text3 = "";
  for await (const res of backResponse) text3 += res;
  const embedResponse = await Ollama.embed({
    model: model,
    input: [text1, text3],
  });

  const [embed1, embed2] = embedResponse.embeddings;
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  for (let i = 0; i < embed1.length; i++) dotProduct += embed1[i] * embed2[i];
  for (let i = 0; i < embed1.length; i++) magnitude1 += embed1[i] * embed1[i];
  for (let i = 0; i < embed2.length; i++) magnitude2 += embed2[i] * embed2[i];
  return dotProduct / (magnitude1 * magnitude2);
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
