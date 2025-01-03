import { create } from "zustand";
import { LangText, TranslationRequest } from "../translation/models";
import TranslationAgent from "../translation/agent";
import useConfigStore from "../config/store";

export interface ParagraphStore {
  request: TranslationRequest;
  model: string;
  useRefinement: boolean;
  translatedText: string;
  isTranslating: boolean;
  confidenceScore: number | null;

  setModel: (model: string | null) => void;
  setSourceLang: (lang: string | null) => void;
  setTargetLang: (lang: string | null) => void;
  setUseRefinement: (use: boolean) => void;
  setContext: (context: string) => void;
  removeExampleAt: (index: number) => void;
  addExample: () => void;
  modifyExampleAt: (index: number, new1?: string, new2?: string) => void;
  setOriginalText: (text: string) => void;
  startTranslation: () => Promise<void>;
}

const useParagraphStore = create<ParagraphStore>()((set, get) => ({
  request: { text: "", sourceLang: "", targetLang: "", examples: [] },
  model: "",
  availableModels: [],
  allLanguages: [],
  useRefinement: false,
  translatedText: "",
  isTranslating: false,
  confidenceScore: null,

  setModel: (model) => set({ model: model ?? "" }),
  setSourceLang: (lang) =>
    set({ request: { ...get().request, sourceLang: lang ?? "" } }),
  setTargetLang: (lang) =>
    set({ request: { ...get().request, targetLang: lang ?? "" } }),
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
  startTranslation: async () => {
    set({ translatedText: "", isTranslating: true, confidenceScore: null });
    const host = useConfigStore.getState().host;
    const agent = new TranslationAgent(get().model, host);
    const request = get().request;
    const translateResponse = agent.translate(request, get().useRefinement);
    let translation = "";
    for await (const res of translateResponse) {
      translation += res;
      set({ translatedText: translation });
    }
    set({ isTranslating: false });

    const langText1: LangText = {
      text: request.text,
      lang: request.sourceLang,
    };
    const langText2: LangText = {
      text: translation,
      lang: request.targetLang,
    };
    const similarity = await agent.similarity(langText1, langText2);
    set({ confidenceScore: similarity });
  },
}));

export default useParagraphStore;
