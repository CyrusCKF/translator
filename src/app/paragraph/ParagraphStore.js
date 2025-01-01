import { create } from "zustand";
import {
  calculateSimilarity,
  getAllModels,
  translate,
} from "../agent/AgentApi";
import TranslationAgent from "../translation/agent";

const useParagraphStore = create((set, get) => ({
  availableModels: [],
  model: "",
  allLanguages: [],
  fromLanguage: "",
  toLanguage: "",
  useRefinement: false,
  context: "",
  examples: [["", ""]],
  originalText: "",
  translatedText: "",
  isTranslating: false,
  confidenceScore: null,

  setModel: (model) => set({ model: model }),
  setFromLanguage: (fromLanguage) => set({ fromLanguage: fromLanguage }),
  setToLanguage: (toLanguage) => set({ toLanguage: toLanguage }),
  setUseRefinement: (useRefinement) => set({ useRefinement: useRefinement }),
  setContext: (context) => set({ context: context }),
  removeExampleAt: (index) =>
    set((state) => {
      const examples = [...state.examples];
      examples.splice(index, 1);
      return { examples: examples };
    }),
  addExample: () =>
    set((state) => {
      const examples = [...state.examples];
      examples.push(["", ""]);
      return { examples: examples };
    }),
  modifyExampleAt: (index, new1 = null, new2 = null) =>
    set((state) => {
      const examples = JSON.parse(JSON.stringify(state.examples));
      if (new1 != null) examples[index][0] = new1;
      if (new2 != null) examples[index][1] = new2;
      return { examples: examples };
    }),
  setOriginalText: (text) => set({ originalText: text }),

  getModels: async () => {
    const models = await TranslationAgent.getAllModels();
    console.log(models);
    set({ availableModels: models });
  },
  startTranslation: async () => {
    set({ translatedText: "", isTranslating: true, confidenceScore: null });
    let examplesClone = JSON.parse(JSON.stringify(get().examples));
    examplesClone = examplesClone.filter(
      ([text1, text2]) => text1 !== "" && text2 !== "",
    );
    const params = {
      model: get().model,
      text: get().originalText,
      sourceLang: get().fromLanguage,
      targetLang: get().toLanguage,
      withRefinement: get().useRefinement,
      context: get().context,
      examples: examplesClone,
    };
    const translateResponse = translate(params);
    for await (const res of translateResponse) {
      set({ translatedText: get().translatedText + res });
    }
    set({ isTranslating: false });

    const similarity = await new TranslationAgent(get().model).similarity(
      {
        text: params.text,
        lang: params.sourceLang,
      },
      {
        text: get().translatedText,
        lang: params.targetLang,
      },
    );
    set({ confidenceScore: similarity });
  },
}));

export default useParagraphStore;
