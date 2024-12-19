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
