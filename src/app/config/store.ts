import { create } from "zustand";
import TranslationAgent from "../translation/agent";
import LANGUAGES from "./languages";

export interface ConfigStore {
  version: string;
  languages: Language[];
  host: string;
  alertInvalidHost: boolean;
  models: string[];

  setHost: (text: string) => void;
  closeInvalidAlert: () => void;
}

const useConfigStore = create<ConfigStore>()((set, get) => {
  async function setHost(host: string) {
    await Promise<void>; // so that set works after init
    set({ host: host });
    try {
      const models = await TranslationAgent.getAllModels(host);
      set({ models: models, alertInvalidHost: false });
    } catch (e) {
      set({ alertInvalidHost: true });
    }
  }

  window.config.getAppVersion().then((res) => set({ version: res }));
  setHost("http://127.0.0.1:11434");
  return {
    version: "",
    languages: LANGUAGES,
    host: "",
    alertInvalidHost: false,
    models: [],

    setHost: setHost,
    closeInvalidAlert: () => set({ alertInvalidHost: false }),
  };
});

export default useConfigStore;
