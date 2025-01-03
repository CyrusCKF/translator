import { app, contextBridge, ipcMain, ipcRenderer } from "electron";

export async function subscribeConfig() {
  ipcMain.handle("getAppVersion", (e) => app.getVersion());
}

export function exposeConfig() {
  const configHandler = {
    getAppVersion: (): Promise<string> => ipcRenderer.invoke("getAppVersion"),
  };
  contextBridge.exposeInMainWorld("config", configHandler);
  return configHandler;
}

declare global {
  interface Window {
    config: ReturnType<typeof exposeConfig>;
  }
}
