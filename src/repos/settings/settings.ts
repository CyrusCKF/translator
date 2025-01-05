import Language from "../../models/language";

export async function readLanguagesCsv(): Promise<Language[]> {
  const contents = await window.api.readAssetCsvFile("languages.csv");
  const results: Language[] = contents.slice(1).map((e) => ({
    name: e[0],
    code: e[1],
    endonym: e[2],
  }));
  return results;
}

export async function getAppVersion() {
  return window.api.getAppVersion();
}
