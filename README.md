# Context-aware LLM Translator (CALT)

This project is an LLM translator that uses Ollama and is built with react, electron and mantine. Downloadable applications can be found in the sidebar.

## Development

This project uses _Electron React Boilerplate_ https://electron-react-boilerplate.js.org/

## FAQs

1. Purpose of this project

This project incorporates recent research to leverage LLM for the best translation results. The main difficulties arise from the limited capacities of pretrained local LLM.

2. Comparison with Google translate/Deepl/etc ...

It has always been challenging to use machine translation for creative media project. The context, tone and lore will often be lost in translation and the style is not consistent. When using LLM, it is possible to provide context and examples, making a more coherent results.

3. Comparison with ChatGPT/GPT4-o/etc ...

This project uses Ollama as the LLM backend. The models will be run locally and the performance depends on your machine and model chosen. Running this project is also completely free.

4. Is this app entirely offline?

Yes. Once the model is downloaded, the project runs locally.

5. Can I tune the prompts for translation?

Yes. Go to `assets\prompts` in the application folder and modify the txt files.

6. Can I use my own LLM?

Make sure your own model complies with the Ollama interface and it is good to go.

7. I am interested in the technical details. Where can I learn it?

Please check `technical-notes.md` in this repo.
