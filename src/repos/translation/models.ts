import Language from "../../models/language";

export interface TranslationRequest {
  text: string;
  sourceLang: Language;
  targetLang: Language;
  context?: string;
  examples: [string, string][];
}

export interface LangText {
  lang: Language;
  text: string;
}
