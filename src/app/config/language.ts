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

const LANGUAGES: Language[] = [
  {
    name: "English",
    code: "en",
    endonym: "English",
  },
  {
    name: "Chinese (Traditional)",
    code: "zhT",
    endonym: "繁體中文",
  },
  {
    name: "Chinese (Simplified)",
    code: "zhS",
    endonym: "簡體中文",
  },
];

export default LANGUAGES;

if (require.main === module) {
  main();
}

async function main() {
  // const fs = await import("fs");
  // const contents = fs.readFileSync("assets/languages.json", "utf-8");
  // const languages: Language[] = JSON.parse(contents);
  // console.log(languages);
}
