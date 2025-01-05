import { create } from "zustand";
import { Language } from "../repos/translation/models";
import { DEFAULT_HOST, fetchFromHost, readLanguagesCsv } from "../repos/settings/settings";

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

export default useSettingsStore;
