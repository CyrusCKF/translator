import { create } from "zustand";
import Language from "../models/language";
import { getAppVersion, readLanguagesCsv } from "../repos/settings/settings";
import TranslationAgent, { DEFAULT_HOST } from "../repos/translation/agent";

export interface SettingsStore {
  version: string;
  languages: Language[];
  host: string;
  alertInvalidHost: boolean;
  models: string[];

  updateHost: (text: string) => Promise<void>;
  closeInvalidAlert: () => void;
}

const useSettingsStore = create<SettingsStore>()((set, get) => {
  async function updateHost(host: string) {
    set({ host: host });
    const results = await TranslationAgent.tryListModels(host);
    set({ models: results.models, alertInvalidHost: !results.isSuccess });
  }

  getAppVersion().then((res) => set({ version: res }));
  readLanguagesCsv().then((res) => set({ languages: res }));
  setTimeout(() => updateHost(DEFAULT_HOST), 0); // so that set works after init
  return {
    version: "",
    languages: [],
    host: DEFAULT_HOST,
    alertInvalidHost: false,
    models: [],

    updateHost: updateHost,
    closeInvalidAlert: () => set({ alertInvalidHost: false }),
  };
});

export default useSettingsStore;
