import { create } from "zustand";
import {
  calculateSimilarity,
  getAllModels,
  translate,
} from "../agent/AgentApi";

const useParagraphStore = create((set, get) => ({
  availableModels: [],
  model: "",
  allLanguages: [],
  fromLanguage: "",
  toLanguage: "",
  context: "",
  originalText: "",
  translatedText: "",
  isTranslating: false,
  confidenceScore: null,

  setModel: (model) => set({ model: model }),
  setFromLanguage: (fromLanguage) => set({ fromLanguage: fromLanguage }),
  setToLanguage: (toLanguage) => set({ toLanguage: toLanguage }),
  setContext: (context) => set({ context: context }),
  setOriginalText: (text) => set({ originalText: text }),

  getModels: async () => {
    const models = await getAllModels();
    set({ availableModels: models });
  },
  startTranslation: async () => {
    set({ translatedText: "", isTranslating: true, confidenceScore: null });
    const params = {
      model: get().model,
      text: get().originalText,
      from: get().fromLanguage,
      to: get().toLanguage,
    };
    const translateResponse = translate(params);
    for await (const res of translateResponse) {
      set({ translatedText: get().translatedText + res });
    }
    set({ isTranslating: false });

    const similarity = await calculateSimilarity({
      text1: params.text,
      text2: get().translatedText,
      language1: params.from,
      language2: params.to,
      model: params.model,
    });
    set({ confidenceScore: similarity });
  },
}));

export default useParagraphStore;
