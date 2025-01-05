import TranslationAgent from "../repos/translation/agent";
import { LangText } from "../repos/translation/models";
import useParagraphStore from "./paragraph";
import useSettingsStore from "./settings";

export async function startTranslation() {
  const setParagraph = useParagraphStore.setState;
  setParagraph({
    translatedText: "",
    isTranslating: true,
    confidenceScore: null,
  });
  const paragraph = useParagraphStore.getState();
  const host = useSettingsStore.getState().host;
  const agent = new TranslationAgent(paragraph.model, host);
  const request = paragraph.request;
  const translateResponse = agent.translate(request, paragraph.useRefinement);
  
  let translation = "";
  for await (const res of translateResponse) {
    translation += res;
    setParagraph({ translatedText: translation });
  }
  setParagraph({ isTranslating: false });

  const langText1: LangText = {
    text: request.text,
    lang: request.sourceLang,
  };
  const langText2: LangText = {
    text: translation,
    lang: request.targetLang,
  };
  const similarity = await agent.similarity(langText1, langText2);
  setParagraph({ confidenceScore: similarity });
}
