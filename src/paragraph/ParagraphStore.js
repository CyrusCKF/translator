import { create } from "zustand";
import { getAllModels, translate } from "../agent/AgentApi";

const useParagraphStore = create((set) => ({
  availableModels: [],
  model: "",
  allLanguages: [],
  fromLanguage: "",
  toLanguage: "",
  context: "",
  originalText: "",
  translatedText: "",
  isTranslating: false,

  setModel: (model) => set({ model: model }),
  setFromLanguage: (fromLanguage) => set({ fromLanguage: fromLanguage }),
  setToLanguage: (toLanguage) => set({ toLanguage: toLanguage }),
  setContext: (event) => set({ context: event.currentTarget.value }),
  setOriginalText: (event) => set({ originalText: event.currentTarget.value }),

  getModels: async () => {
    const models = await getAllModels();
    set({ availableModels: models });
  },
  startTranslation: async () => {
    set({ translatedText: "", isTranslating: true });
    const translatedText = await translate();
    set({ translatedText: translatedText, isTranslating: false });
  },
}));

export default useParagraphStore;
