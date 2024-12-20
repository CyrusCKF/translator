import { create } from "zustand";
import { translate } from "../agent/AgentApi";

const useParagraphStore = create((set) => ({
  model: "",
  fromLanguage: "",
  toLanguage: "",
  context: "",
  originalText: "",
  translatedText: "",
  isTrasnlating: false,

  setModel: (model) => set({ model: model }),
  setFromLanguage: (fromLanguage) => set({ fromLanguage: fromLanguage }),
  setToLanguage: (toLanguage) => set({ toLanguage: toLanguage }),
  setContext: (event) => set({ context: event.currentTarget.value }),
  setOriginalText: (event) => set({ originalText: event.currentTarget.value }),
  startTranslation: async () => {
    set({ isTrasnlating: true });
    const translatedText = await translate();
    set({ translatedText: translatedText, isTrasnlating: false });
  },
}));

export default useParagraphStore;
