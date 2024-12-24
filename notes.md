1. Translation with context and examples  
   This project incorporates recent research to leverage LLM for the best translation results. The main difficulties arise from the limited capacities of pretrained local LLM. Usual improvements include prompt template, few-shot learning and chain-of-thought.

TEaR: Improving LLM-based Machine Translation with Systematic Self-Refinement, https://arxiv.org/html/2402.16379v3  
Prompting PaLM for Translation: Assessing Strategies and Performance, https://aclanthology.org/2023.acl-long.859/  
The Unreasonable Effectiveness of Few-shot Learning for Machine Translation, https://proceedings.mlr.press/v202/garcia23a.html

2. Calculation of translation confidence  
   It uses text similarity of back-translated text, i.e. the cosine similarity between the embeddings of original text and back translated text. Text similarity is not a "key metric" in quality estimation of machine translation task, but in practice it works quite well and can be automatically calculated in this project.

Textual Similarity as a Key Metric in Machine Translation Quality Estimation, https://arxiv.org/html/2406.07440v1  
From Handcrafted Features to LLMs: A Brief Survey for Machine Translation Quality Estimation, https://arxiv.org/abs/2403.14118  
Quality Estimation and Translation Metrics via Pre-trained Word and Sentence Embeddings, https://aclanthology.org/W19-5410/
