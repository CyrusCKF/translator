export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
  context?: string;
  examples: [string, string][];
}

export interface LangText {
  lang: string;
  text: string;
}
