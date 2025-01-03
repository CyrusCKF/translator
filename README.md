# CALT: Context-Aware LLM Translator

Deliver context-aware translation results using Large Language Models (LLM), all free and open source.

## 📷 Screenshots

<img src="doc\screenshot.png" alt="screenshot 1" width="50%"/>

## 🏬 Installation

1. Download the [latest release](https://github.com/CyrusCKF/translator/releases) and extract the files
2. Ensure that [Ollama](https://ollama.com/) is running
3. Run the `.exe` file

## 🌟 About the Project

This project leverages recent research to utilize Large Language Models (LLMs) for optimal translation results. One of the main challenges is the limited capacity of pre-trained LLMs running in a local environment.

### 🎯 Features

* **Free and Offline Translation**: Utilize local LLMs for translation without the need for an internet connection.
* **Context-Aware Input**: Input context to avoid language ambiguity and improve accuracy.
* **Custom Example Pairs**: Add example pairs to ensure more consistent and tone-appropriate translations.
* **Self-Refining Results**: Benefit from self-refinement algorithms that enhance the quality of translations.
* **Translation Confidence Display**: View confidence levels for the translation to gauge reliability.

### Comparison with Google Translate, DeepL, etc

Machine translation for creative media projects has always been challenging. Traditional tools like Google Translate and DeepL often lose context, tone, and lore, resulting in inconsistent styles. However, by using LLMs, it is possible to provide context and examples, leading to more coherent and contextually accurate results.

### Comparison with ChatGPT/GPT-4, etc

This project uses Ollama as the LLM backend, allowing models to run locally. The performance depends on your machine and the model chosen. Unlike cloud-based solutions like ChatGPT or GPT-4, running this project is completely free.

## ❔ FAQ

* **Is this app entirely offline?**

    Yes. Once the model is downloaded, the project runs locally.

* **Can I tune the prompts for translation?**

    Yes. Go to `resources/assets/prompts` in the application folder and modify the `.txt` files.

* **Can I use my own LLM?**

    Yes, as long as your model complies with the Ollama interface.

* **I am interested in the technical details. Where can I learn more?**

    Please check [`technical.md`](doc/technical.md)

## 👋 Development

Please check [`technical.md`](doc/technical.md)
