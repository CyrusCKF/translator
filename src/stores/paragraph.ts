import { create } from "zustand";
import { TranslationRequest } from "../repos/translation/models";
import Language, { languageNull } from "../models/language";

export interface ParagraphStore {
  request: TranslationRequest;
  model: string;
  useRefinement: boolean;
  translatedText: string;
  isTranslating: boolean;
  confidenceScore: number | null;

  setModel: (model: string | null) => void;
  setSourceLang: (lang: Language | null) => void;
  setTargetLang: (lang: Language | null) => void;
  setUseRefinement: (use: boolean) => void;
  setContext: (context: string) => void;
  removeExampleAt: (index: number) => void;
  addExample: () => void;
  modifyExampleAt: (index: number, new1?: string, new2?: string) => void;
  setOriginalText: (text: string) => void;
}

const useParagraphStore = create<ParagraphStore>()((set, get) => ({
  request: {
    text: "",
    sourceLang: languageNull,
    targetLang: languageNull,
    examples: [],
  },
  model: "",
  availableModels: [],
  allLanguages: [],
  useRefinement: false,
  translatedText: "",
  isTranslating: false,
  confidenceScore: null,

  setModel: (model) => set({ model: model ?? "" }),
  setSourceLang: (lang) =>
    set({ request: { ...get().request, sourceLang: lang ?? languageNull } }),
  setTargetLang: (lang) =>
    set({ request: { ...get().request, targetLang: lang ?? languageNull } }),
  setUseRefinement: (useRefinement) => set({ useRefinement: useRefinement }),
  setContext: (context) =>
    set({ request: { ...get().request, context: context } }),
  removeExampleAt: (index) =>
    set((state) => {
      const examples = [...state.request.examples];
      examples.splice(index, 1);
      return { request: { ...state.request, examples: examples } };
    }),
  addExample: () =>
    set((state) => {
      const examples = [...state.request.examples];
      examples.push(["", ""]);
      return { request: { ...state.request, examples: examples } };
    }),
  modifyExampleAt: (index, new1?, new2?) =>
    set((state) => {
      const examples = JSON.parse(JSON.stringify(state.request.examples));
      if (new1 != undefined) examples[index][0] = new1;
      if (new2 != undefined) examples[index][1] = new2;
      return { request: { ...state.request, examples: examples } };
    }),
  setOriginalText: (text) => set({ request: { ...get().request, text: text } }),
}));

export default useParagraphStore;
