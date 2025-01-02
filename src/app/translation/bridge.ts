// utility function for electron
// connect to main and renderer process

import { app, contextBridge, ipcMain, ipcRenderer } from "electron";

export async function subscribeTranslation() {
  // import here so using this file in each electron process won't cause error
  const path = await import("path");
  const fs = await import("fs");

  ipcMain.handle("readAssetTextFile", (e, ...paths: string[]) => {
    const RESOURCES_PATH =
      app !== undefined && app.isPackaged
        ? path.join(process.resourcesPath, "assets")
        : path.join(__dirname, "../../assets");
    return fs.readFileSync(path.join(RESOURCES_PATH, ...paths), "utf8");
  });
}

export function exposeTranslation() {
  const translationHandler = {
    readAssetTextFile: (...paths: string[]): Promise<string> => {
      return ipcRenderer.invoke("readAssetTextFile", ...paths);
    },
  };
  contextBridge.exposeInMainWorld("translation", translationHandler);
  return translationHandler;
}

declare global {
  interface Window {
    translation: ReturnType<typeof exposeTranslation>;
  }
}
