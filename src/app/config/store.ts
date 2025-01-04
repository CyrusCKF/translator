import { create } from "zustand";
import TranslationAgent from "../translation/agent";
import { Language } from "../translation/models";
import { DEFAULT_HOST, fetchFromHost, readLanguagesCsv } from "./util";

export interface ConfigStore {
  version: string;
  languages: Language[];
  host: string;
  alertInvalidHost: boolean;
  models: string[];

  updateHost: (text: string) => Promise<void>;
  closeInvalidAlert: () => void;
}

const useConfigStore = create<ConfigStore>()((set, get) => {
  async function updateHost(host: string) {
    await Promise<void>; // so that set works after init
    set({ host: host });
    const results = await fetchFromHost(host);
    set({ models: results.models, alertInvalidHost: !results.isSuccess });
  }

  window.api.getAppVersion().then((res) => set({ version: res }));
  updateHost(DEFAULT_HOST);
  readLanguagesCsv().then((res) => set({ languages: res }));
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

export default useConfigStore;
