import Ollama from "ollama/browser";
import { estimatePrompt, refinePrompt, translatePrompt } from "./Prompts.ts";

export async function getAllModels() {
  // await delay(1000);
  return await Ollama.list().then((response) => {
    return response.models.map((e) => e.name);
  });
}

export async function* translate({
  text,
  model,
  sourceLang,
  targetLang,
  context = "",
  examples = [],
  withRefinement = false,
} = {}) {
  // await delay(1000);
  const transPrompt = translatePrompt(
    text,
    sourceLang,
    targetLang,
    context,
    examples
  );
  const translateResponse = await Ollama.generate({
    model: model,
    prompt: transPrompt,
    stream: true,
  });
  let rawTranslation = "";
  for await (const res of translateResponse) {
    if (res.response == null) continue;
    if (withRefinement) rawTranslation += res.response;
    else yield res.response;
  }
  if (!withRefinement) return;

  const estimPrompt = estimatePrompt(
    text,
    rawTranslation,
    sourceLang,
    targetLang
  );
  const estimResponse = await Ollama.generate({
    model: model,
    prompt: estimPrompt,
  });
  const mqmAnnotations = estimResponse.response;

  const refPrompt = refinePrompt(
    text,
    rawTranslation,
    sourceLang,
    targetLang,
    mqmAnnotations,
    context,
    examples
  );
  const refResponse = await Ollama.generate({
    model: model,
    prompt: refPrompt,
    stream: true,
  });

  for await (const res of refResponse) {
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
    sourceLang: language2,
    targetLang: language1,
    withRefinement: false,
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
