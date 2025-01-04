export interface Language {
  name: string;
  /**
   * The native name of the language
   */
  endonym: string;
  /**
   * Two character code, or custom code for regional language
   * https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
   */
  code: string;
}

export const languageNull: Language = { name: "", endonym: "", code: "" };

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
