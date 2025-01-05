import TranslationAgent from "../translation/agent";
import { Language } from "../translation/models";

export const DEFAULT_HOST = "http://127.0.0.1:11434";

export async function fetchFromHost(host: string) {
  const results: { isSuccess: boolean; models: string[] } = {
    isSuccess: false,
    models: [],
  };
  try {
    const models = await TranslationAgent.getAllModels(host);
    results.isSuccess = true;
    results.models = models;
  } catch (e) {}
  return results;
}

export async function readLanguagesCsv(): Promise<Language[]> {
  const contents = await window.api.readAssetCsvFile("languages.csv");
  const results: Language[] = contents.slice(1).map((e) => ({
    name: e[0],
    code: e[1],
    endonym: e[2],
  }));
  return results;
}
