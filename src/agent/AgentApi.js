import Ollama from "ollama/browser";

export async function getAllModels() {
  return await Ollama.list().then(
    (response) => {
      return response.models.map((e) => e.name);
    },
    (error) => {
      console.error(error);
    }
  );
}

export async function translate() {
  await delay(5000);
  return "Translation TODO";
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
