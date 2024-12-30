export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
  context: string;
  examples: string[];
}

export interface LangText {
  language: string;
  text: string;
}

if (require.main === module) {
  console.log("model");
}
