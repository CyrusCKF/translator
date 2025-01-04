// utility function for electron
// connect to main and renderer process

import { parse } from "csv-parse/sync";
import { app, contextBridge, ipcMain, ipcRenderer } from "electron";

export async function subscribeIPC() {
  // import here so using this file in each electron process won't cause error
  const path = await import("path");
  const fs = await import("fs");
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  ipcMain.handle("readAssetTextFile", (e, ...paths: string[]) => {
    return fs.readFileSync(path.join(RESOURCES_PATH, ...paths), "utf8");
  });
  ipcMain.handle("readAssetCsvFile", (e, ...paths: string[]) => {
    const contents = fs.readFileSync(path.join(RESOURCES_PATH, ...paths), "utf8");
    const values: string[][] = parse(contents, {});
    return values;
  });
  ipcMain.handle("getAppVersion", (e) => app.getVersion());
}

export function exposeIPC() {
  const handler = {
    readAssetTextFile: (...paths: string[]): Promise<string> => {
      return ipcRenderer.invoke("readAssetTextFile", ...paths);
    },
    readAssetCsvFile: (...paths: string[]): Promise<string[][]> => {
      return ipcRenderer.invoke("readAssetCsvFile", ...paths);
    },
    getAppVersion: (): Promise<string> => ipcRenderer.invoke("getAppVersion"),
  };
  contextBridge.exposeInMainWorld("api", handler);
  return handler;
}

declare global {
  interface Window {
    api: ReturnType<typeof exposeIPC>;
  }
}
