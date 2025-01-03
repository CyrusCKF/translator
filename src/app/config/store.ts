import { create } from "zustand";

export interface ConfigStore {
  version: string;
}

const useConfigStore = create<ConfigStore>()((set) => {
  window.config.getAppVersion().then((res) => set({ version: res }));
  return {
    version: "",
  };
});

export default useConfigStore;
