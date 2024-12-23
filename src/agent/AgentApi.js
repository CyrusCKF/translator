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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
