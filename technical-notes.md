1. Refinement  
   To combat the limited capacities of pretrained local LLM, I used a special techniques described in the below paper, which is systematic self-refinement. The main idea is to feed the raw translation back to the model and ask it to proofread where there is flaws and correct it.

TEaR: Improving LLM-based Machine Translation with Systematic Self-Refinement, https://arxiv.org/html/2402.16379v3

2. Examples  
   Examples provided for translation are used as few-shot learning for the models. It has been shown that by providing a couple of examples, the translation quality of smaller LLM can improve much further, approaching the quality of state of the art model. This is especially true for low resource language, when the quality of the training data is lower.

Prompting PaLM for Translation: Assessing Strategies and Performance, https://aclanthology.org/2023.acl-long.859/  
The Unreasonable Effectiveness of Few-shot Learning for Machine Translation, https://proceedings.mlr.press/v202/garcia23a.html

3. Translation confidence  
   It uses text similarity of back-translated text, i.e. the cosine similarity between the embeddings of original text and back translated text. Text similarity is not a "key metric" in quality estimation of machine translation task, but in practice it works quite well and can be automatically calculated in this project.

Textual Similarity as a Key Metric in Machine Translation Quality Estimation, https://arxiv.org/html/2406.07440v1  
From Handcrafted Features to LLMs: A Brief Survey for Machine Translation Quality Estimation, https://arxiv.org/abs/2403.14118  
Quality Estimation and Translation Metrics via Pre-trained Word and Sentence Embeddings, https://aclanthology.org/W19-5410/
