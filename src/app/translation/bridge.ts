// utility function for electron
// connect to main and renderer process

import { app, contextBridge, ipcMain, ipcRenderer } from "electron";

export async function subscribeTranslation() {
  const path = await import("path");
  const fs = await import("fs");

  ipcMain.handle("readAssetTextFile", (e, filePath: string) => {
    const RESOURCES_PATH =
      app !== undefined && app.isPackaged
        ? path.join(process.resourcesPath, "assets")
        : path.join(__dirname, "../../assets");
    return fs.readFileSync(path.join(RESOURCES_PATH, filePath), "utf8");
  });
}

export function exposeTranslation() {
  const translationHandler = {
    readAssetTextFile: (filePath: string): Promise<string> => {
      return ipcRenderer.invoke("readAssetTextFile", filePath);
    },
  };
  contextBridge.exposeInMainWorld("translation", translationHandler);
  return translationHandler;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    translation: ReturnType<typeof exposeTranslation>;
  }
}
