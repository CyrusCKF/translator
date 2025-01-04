import { create } from "zustand";
import TranslationAgent from "../translation/agent";

export interface ConfigStore {
  version: string;
  languages: Language[];
  host: string;
  alertInvalidHost: boolean;
  models: string[];

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
  set({ languages: [] });
  return {
    version: "",
    languages: [],
    host: "http://127",
    alertInvalidHost: false,
    models: [],

    closeInvalidAlert: () => set({ alertInvalidHost: false }),
  };
});

export default useConfigStore;
