# Development

## Tech Stack

[![node.js](https://img.shields.io/badge/Node.js-white?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-white?style=for-the-badge&logo=React)](https://react.dev/)
[![Electron](https://img.shields.io/badge/Electron-white?style=for-the-badge&logo=Electron)](https://www.electronjs.org/)
[![Mantine](https://img.shields.io/badge/Mantine-white?style=for-the-badge&logo=Mantine)](https://mantine.dev/)
[![Ollama](https://img.shields.io/badge/Ollama-silver?style=for-the-badge&logo=Ollama)](https://ollama.com/)

This project is built on [Electron React Boilerplate](<https://electron-react-boilerplate.js.org/>)

## Run Locally

1. Clone the project

    ```bash
    git clone https://github.com/CyrusCKF/translator.git
    ```

2. Go to the project directory

    ```bash
    cd translator
    ```

3. Install dependencies

    ```bash
    npm install
    ```

4. Run the project

    ```bash
    npm run start
    ```

## Package

To package this project, run

```bash
npm run package
```

## Translation Methods

1. Refinement  
    To combat the limited capacities of pretrained local LLM, I used a special techniques described in the below paper, which is systematic self-refinement. The main idea is to feed the raw translation back to the model and ask it to proofread where there is flaws and correct it.

    TEaR: Improving LLM-based Machine Translation with Systematic Self-Refinement, <https://arxiv.org/html/2402.16379v3>

2. Examples  
    Examples provided for translation are used as few-shot learning for the models. It has been shown that by providing a couple of examples, the translation quality of smaller LLMs can improve significantly, approaching the quality of state-of-the-art models. This is especially true for low-resource languages, where the quality of the training data is lower.

    Prompting PaLM for Translation: Assessing Strategies and Performance, <https://aclanthology.org/2023.acl-long.859/>  
    The Unreasonable Effectiveness of Few-shot Learning for Machine Translation, <https://proceedings.mlr.press/v202/garcia23a.html>

3. Translation confidence  
    The translation confidence is measured using the text similarity of back-translated text, specifically the cosine similarity between the embeddings of the original text and the back-translated text. While text similarity is not considered a "key metric" in the quality estimation of machine translation tasks, it works quite well in practice and can be automatically calculated in this project.

    Textual Similarity as a Key Metric in Machine Translation Quality Estimation, <https://arxiv.org/html/2406.07440v1>  
    From Handcrafted Features to LLMs: A Brief Survey for Machine Translation Quality Estimation, <https://arxiv.org/abs/2403.14118>  
    Quality Estimation and Translation Metrics via Pre-trained Word and Sentence Embeddings, <https://aclanthology.org/W19-5410/>
