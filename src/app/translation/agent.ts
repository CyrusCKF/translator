import ollama from "ollama/browser";
import { LangText, TranslationRequest } from "./models";

export default class TranslationAgent {
  model;
  constructor(model: string) {
    this.model = model;
  }

  static async getAllModels() {
    return await ollama.list().then((response) => {
      return response.models.map((e) => e.name);
    });
  }

  async *translate(
    request: TranslationRequest,
    refine: boolean = false,
  ): AsyncGenerator<string, void, unknown> {
    // TODO
  }

  async similarity(langText1: LangText, langText2: LangText): Promise<number> {
    // TODO
    return 0;
  }
}
