import { GenerateResponse, Ollama } from "ollama/browser";
import { LangText, TranslationRequest } from "./models";
import {
  buildEstimatePrompt,
  buildRefinePrompt,
  buildTranslatePrompt,
} from "./prompts";

export default class TranslationAgent {
  model: string;
  host: string;
  constructor(model: string, host: string) {
    this.model = model;
    this.host = host;
  }

  static async getAllModels(host: string) {
    return await new Ollama({ host: host })
      .list()
      .then((response) => response.models.map((e) => e.name));
  }

  async generate(prompt: string): Promise<GenerateResponse> {
    return await new Ollama({ host: this.host }).generate({
      model: this.model,
      prompt: prompt,
    });
  }

  async generateStream(prompt: string) {
    return await new Ollama({ host: this.host }).generate({
      model: this.model,
      prompt: prompt,
      stream: true,
    });
  }

  async *translate(
    request: TranslationRequest,
    refine: boolean = false,
  ): AsyncGenerator<string, void, unknown> {
    const translatePrompt = await buildTranslatePrompt(request);
    if (!refine) {
      const translateResponse = await this.generateStream(translatePrompt);
      for await (const res of translateResponse) {
        if (res.response != null) yield res.response;
      }
      return;
    }
    const translateResponse = await this.generate(translatePrompt);
    const rawTranslation = translateResponse.response;

    const estimatePrompt = await buildEstimatePrompt(request, rawTranslation);
    const estimResponse = await this.generate(estimatePrompt);
    const mqmAnnotations = estimResponse.response;

    const refinePrompt = await buildRefinePrompt(
      request,
      rawTranslation,
      mqmAnnotations,
    );
    const refResponse = await this.generateStream(refinePrompt);

    for await (const res of refResponse) {
      if (res.response != null) yield res.response;
    }
  }

  async similarity(langText1: LangText, langText2: LangText): Promise<number> {
    const backRequest = {
      text: langText2.text,
      sourceLang: langText1.lang,
      targetLang: langText2.lang,
      examples: [],
    };
    const backResponse = this.translate(backRequest, false);
    let text3 = "";
    for await (const res of backResponse) text3 += res;
    const embedResponse = await new Ollama({ host: this.host }).embed({
      model: this.model,
      input: [langText1.text, text3],
    });

    const [embed1, embed2] = embedResponse.embeddings;
    const sum = (accum: number, cur: number) => accum + cur;
    const dotProduct = embed1.map((e, i) => e * embed2[i]).reduce(sum, 0);
    const magnitude1 = embed1.map((e) => e * e).reduce(sum, 0);
    const magnitude2 = embed2.map((e) => e * e).reduce(sum, 0);
    return dotProduct / (magnitude1 * magnitude2);
  }
}
