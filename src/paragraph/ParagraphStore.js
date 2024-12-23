import { create } from "zustand";
import { getAllModels, translate } from "../agent/AgentApi";

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
    set({ translatedText: "", isTranslating: true });
    const translateResponse = translate({
      model: get().model,
      text: get().originalText,
      to: get().toLanguage,
    });
    for await (const res of translateResponse) {
      set({ translatedText: get().translatedText + res });
    }
    set({ isTranslating: false });
  },
}));

export default useParagraphStore;
