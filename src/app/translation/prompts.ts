import { TranslationRequest } from "./models";

function formatString(str: string, args: { [key: string]: string }): string {
  // match placeholder in brackets by key in args. Examples:
  // ("hi {name}", {name: "Jay"}) === "hi Jay"
  return str.replace(/\{(\w+)\}/g, (match, key) => args[key]);
}

function buildExampleStrings(examples: [string, string][]): string | undefined {
  if (examples.length == 0) return undefined;
  const exampleStrings = examples
    .map(([source, target]) => `Source: ${source}\nTarget: ${target}`)
    .join("\n");
  return exampleStrings;
}

async function readPromptFile(filename: string) {
  return await window.translation.readAssetTextFile("prompts", filename);
}

export async function buildTranslatePrompt(request: TranslationRequest) {
  const template = await readPromptFile("translate.txt");
  const placeholders = <{ [key: string]: string }>{
    text: request.text,
    sourceLang: request.sourceLang.name,
    targetLang: request.targetLang.name,
    context: request.context ?? "",
    examples: buildExampleStrings(request.examples) ?? "",
  };
  return formatString(template, placeholders);
}

export async function buildEstimatePrompt(
  request: TranslationRequest,
  translation: string,
) {
  const template = await readPromptFile("estimate.txt");
  const placeholders = <{ [key: string]: string }>{
    sourceLang: request.sourceLang.name,
    targetLang: request.targetLang.name,
    source: request.text,
    translation: translation,
  };
  return formatString(template, placeholders);
}

export async function buildRefinePrompt(
  request: TranslationRequest,
  rawTranslation: string,
  mqmAnnotations: string,
) {
  const template = await readPromptFile("refine.txt");
  const placeholders = <{ [key: string]: string }>{
    sourceLang: request.sourceLang.name,
    targetLang: request.targetLang.name,
    source: request.text,
    context: request.context ?? "",
    examples: buildExampleStrings(request.examples) ?? "",
    rawTranslation: rawTranslation,
    mqmAnnotations: mqmAnnotations,
  };
  return formatString(template, placeholders);
}
