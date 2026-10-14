// Curated catalog of NVIDIA-hosted models (fetched live from the NIM catalog
// via API Rails on 2026-10-14, 80 models). Specs are curated from public model
// cards; context/params are best-effort published values.
//
// category: chat | code | vision | omni | embedding | safety | translation | document | domain
// chatReady: model accepts /v1/chat/completions style prompts

const M = (id, name, publisher, category, params, context, capabilities, description, chatReady = true) =>
  ({ id, name, publisher, category, params, context, capabilities, description, chatReady });

module.exports = [
  // ---- general chat / reasoning ----
  M("01-ai/yi-large", "Yi Large", "01.AI", "chat", "34B", "32K", ["chat", "reasoning", "multilingual"], "High-performing bilingual (EN/ZH) flagship chat model."),
  M("ai21labs/jamba-1.5-large-instruct", "Jamba 1.5 Large", "AI21 Labs", "chat", "398B MoE", "256K", ["chat", "long-context", "reasoning"], "Hybrid SSM-Transformer with a huge 256K context window."),
  M("aisingapore/sea-lion-7b-instruct", "SEA-LION 7B", "AI Singapore", "chat", "7B", "4K", ["chat", "sea-languages"], "Tuned for Southeast Asian languages."),
  M("databricks/dbrx-instruct", "DBRX Instruct", "Databricks", "chat", "132B MoE", "32K", ["chat", "reasoning"], "Fine-grained mixture-of-experts instruct model."),
  M("deepseek-ai/deepseek-v4.1-flash", "DeepSeek V4.1 Flash", "DeepSeek", "chat", "~30B MoE", "128K", ["chat", "reasoning", "fast"], "Latest flash-tier DeepSeek — fast, cheap reasoning."),
  M("google/gemma-2b", "Gemma 2B", "Google", "chat", "2B", "8K", ["chat", "lightweight"], "Google's lightweight open model."),
  M("google/gemma-3-4b-it", "Gemma 3 4B IT", "Google", "chat", "4B", "128K", ["chat", "multimodal-ready"], "Gemma 3 instruction-tuned, 128K context."),
  M("google/gemma-3-12b-it", "Gemma 3 12B IT", "Google", "chat", "12B", "128K", ["chat", "reasoning"], "Gemma 3 mid-size instruction model."),
  M("google/gemma-4-31b-it", "Gemma 4 31B IT", "Google", "chat", "31B", "128K", ["chat", "reasoning"], "Gemma 4 large instruction model."),
  M("google/recurrentgemma-2b", "RecurrentGemma 2B", "Google", "chat", "2B", "8K", ["chat", "efficient"], "Griffin-architecture efficient chat model."),
  M("google/diffusiongemma-26b-a4b-it", "DiffusionGemma 26B A4B", "Google", "chat", "26B (A4B)", "32K", ["chat", "diffusion"], "Experimental diffusion-based language model."),
  M("ibm/granite-3.0-3b-a800m-instruct", "Granite 3.0 3B A800M", "IBM", "chat", "3B MoE", "4K", ["chat", "enterprise"], "IBM Granite mixture-of-experts compact model."),
  M("ibm/granite-3.0-8b-instruct", "Granite 3.0 8B", "IBM", "chat", "8B", "4K", ["chat", "enterprise"], "IBM's enterprise-tuned 8B assistant."),
  M("meta/llama2-70b", "Llama 2 70B", "Meta", "chat", "70B", "4K", ["chat"], "The classic Llama 2 flagship."),
  M("microsoft/phi-3.5-moe-instruct", "Phi 3.5 MoE", "Microsoft", "chat", "42B MoE", "128K", ["chat", "reasoning", "math"], "Phi 3.5 mixture-of-experts reasoning model."),
  M("mistralai/mistral-7b-instruct-v0.3", "Mistral 7B v0.3", "Mistral AI", "chat", "7B", "32K", ["chat"], "The dependable open 7B baseline."),
  M("mistralai/mistral-large", "Mistral Large", "Mistral AI", "chat", "123B", "32K", ["chat", "reasoning", "function-calling"], "Mistral's flagship instruct model."),
  M("mistralai/mistral-large-2-instruct", "Mistral Large 2", "Mistral AI", "chat", "123B", "128K", ["chat", "reasoning", "function-calling"], "Mistral Large 2 with 128K context."),
  M("mistralai/mixtral-8x22b-v0.1", "Mixtral 8x22B", "Mistral AI", "chat", "141B MoE", "64K", ["chat", "reasoning"], "Sparse mixture-of-8-experts model."),
  M("nv-mistralai/mistral-nemo-12b-instruct", "Mistral NeMo 12B", "NVIDIA × Mistral", "chat", "12B", "128K", ["chat", "multilingual"], "NVIDIA-Mistral collaboration, 128K context."),
  M("moonshotai/kimi-k2.6", "Kimi K2.6", "Moonshot AI", "chat", "1T MoE", "256K", ["chat", "agentic", "long-context"], "Moonshot's trillion-parameter agentic model."),
  M("moonshotai/kimi-k3", "Kimi K3", "Moonshot AI", "chat", "1T MoE", "256K", ["chat", "agentic", "reasoning"], "Latest Kimi generation."),
  M("openai/gpt-oss-20b", "GPT-OSS 20B", "OpenAI", "chat", "20B MoE", "128K", ["chat", "reasoning"], "OpenAI's open-weight compact reasoning model."),
  M("writer/palmyra-creative-122b", "Palmyra Creative 122B", "Writer", "domain", "122B", "128K", ["chat", "creative-writing"], "Tuned for divergent creative writing."),
  M("nvidia/nemotron-3-super-120b-a12b", "Nemotron-3 Super 120B", "NVIDIA", "chat", "120B (A12B)", "256K", ["chat", "reasoning", "tools"], "Nemotron-3 Super hybrid reasoning MoE."),
  M("nvidia/nemotron-3-ultra-550b-a55b", "Nemotron-3 Ultra 550B", "NVIDIA", "chat", "550B (A55B)", "256K", ["chat", "reasoning", "tools"], "Frontier open Nemotron-3 Ultra."),
  M("nvidia/nemotron-3.5-lightning-30b-a3b", "Nemotron-3.5 Lightning 30B", "NVIDIA", "chat", "30B (A3B)", "256K", ["chat", "fast", "reasoning"], "Ultra-fast flash-tier Nemotron."),
  M("nvidia/nemotron-nano-3-30b-a3b", "Nemotron Nano 3 30B", "NVIDIA", "chat", "30B (A3B)", "128K", ["chat", "efficient"], "Compact efficient Nemotron for edge/serverless."),
  M("nvidia/llama-3.1-nemotron-51b-instruct", "Nemotron 51B", "NVIDIA", "chat", "51B", "128K", ["chat", "reasoning"], "Puzzle-tuned high-accuracy Llama derivative."),
  M("nvidia/llama-3.1-nemotron-70b-instruct", "Nemotron 70B", "NVIDIA", "chat", "70B", "128K", ["chat", "helpfulness"], "RLHF-tuned for helpfulness on Llama 3.1."),
  M("nvidia/llama-3.1-nemotron-ultra-253b-v1", "Nemotron Ultra 253B", "NVIDIA", "chat", "253B", "128K", ["chat", "reasoning"], "Largest Nemotron accuracy play."),
  M("nvidia/nemotron-4-340b-instruct", "Nemotron-4 340B", "NVIDIA", "chat", "340B", "4K", ["chat", "synthetic-data"], "Generative flagship for synthetic data."),
  M("nvidia/mistral-nemo-minitron-8b-8k-instruct", "Mistral NeMo Minitron 8B", "NVIDIA", "chat", "8B", "8K", ["chat", "pruned-distilled"], "Pruned + distilled compact NeMo variant."),
  M("nvidia/llama3-chatqa-1.5-70b", "Llama3-ChatQA 1.5 70B", "NVIDIA", "chat", "70B", "8K", ["chat", "rag", "qa"], "Conversation QA + RAG specialist."),
  M("nvidia/ising-calibration-1.5-31b", "Ising Calibration 1.5", "NVIDIA", "chat", "31B", "32K", ["chat", "calibration"], "Uncertainty-calibrated instruct model."),
  M("meta/muse-glimmer-30b", "Muse Glimmer 30B", "Meta", "chat", "30B", "32K", ["chat", "creative"], "Meta creative-writing tuned model."),
  M("poolside/laguna-xs-2.1", "Laguna XS 2.1", "poolside", "code", "13B", "32K", ["code", "chat", "software-engineering"], "Code model trained on verified execution."),
  M("z-ai/glm-5.3", "GLM-5.3", "Z.AI", "chat", "355B MoE", "200K", ["chat", "reasoning", "agentic"], "Flagship GLM chat model."),
  M("z-ai/glm-5.3-flash", "GLM-5.3 Flash", "Z.AI", "chat", "30B MoE", "200K", ["chat", "fast"], "Fast tier of GLM-5.3."),
  M("zyphra/zamba2-7b-instruct", "Zamba2 7B", "Zyphra", "chat", "7B", "4K", ["chat", "efficient"], "SSM-hybrid efficiency model."),

  // ---- code ----
  M("bigcode/starcoder2-15b", "StarCoder2 15B", "BigCode", "code", "15B", "16K", ["code", "fill-in-middle"], "Trained on The Stack v2 code corpus."),
  M("deepseek-ai/deepseek-coder-6.7b-instruct", "DeepSeek Coder 6.7B", "DeepSeek", "code", "6.7B", "16K", ["code", "repo-level"], "Repository-level code model."),
  M("google/codegemma-7b", "CodeGemma 7B", "Google", "code", "7B", "8K", ["code", "fill-in-middle"], "Gemma family code specialist."),
  M("google/codegemma-1.1-7b", "CodeGemma 1.1 7B", "Google", "code", "7B", "8K", ["code"], "Refreshed CodeGemma instruction tuning."),
  M("ibm/granite-8b-code-instruct", "Granite 8B Code", "IBM", "code", "8B", "4K", ["code", "enterprise"], "Granite code instruct model."),
  M("ibm/granite-34b-code-instruct", "Granite 34B Code", "IBM", "code", "34B", "8K", ["code", "enterprise"], "Large Granite code model."),
  M("meta/codellama-70b", "Code Llama 70B", "Meta", "code", "70B", "100K", ["code", "fill-in-middle", "long-context"], "Largest Code Llama."),
  M("mistralai/codestral-22b-instruct-v0.1", "Codestral 22B", "Mistral AI", "code", "22B", "32K", ["code", "fill-in-middle"], "Mistral's code generation specialist."),

  // ---- vision / VLM / video understanding ----
  M("adept/fuyu-8b", "Fuyu 8B", "Adept", "vision", "8B", "4K", ["image-input", "chat", "diagrams"], "Multimodal model for UI/diagram understanding."),
  M("meta/llama-3.2-11b-vision-instruct", "Llama 3.2 11B Vision", "Meta", "vision", "11B", "128K", ["image-input", "chat", "reasoning"], "Llama multimodal instruction model."),
  M("meta/llama-3.2-90b-vision-instruct", "Llama 3.2 90B Vision", "Meta", "vision", "90B", "128K", ["image-input", "chat", "reasoning"], "Flagship Llama vision model."),
  M("microsoft/kosmos-2", "Kosmos-2", "Microsoft", "vision", "1.6B", "4K", ["image-input", "grounding"], "Grounded multimodal model."),
  M("microsoft/phi-3-vision-128k-instruct", "Phi-3 Vision 128K", "Microsoft", "vision", "4.2B", "128K", ["image-input", "chat", "ocr"], "Compact high-resolution VLM."),
  M("nvidia/neva-22b", "NeVA 22B", "NVIDIA", "vision", "22B", "4K", ["image-input", "chat"], "NVIDIA multimodal LLaVA-derivative."),
  M("nvidia/vila", "VILA", "NVIDIA", "vision", "13B", "4K", ["image-input", "chat", "multi-image"], "Multi-image reasoning VLM."),
  M("nvidia/cosmos-reason2-8b", "Cosmos Reason2 8B", "NVIDIA", "vision", "8B", "128K", ["image-input", "video-input", "reasoning", "robotics"], "Physical-AI reasoning over images & video."),
  M("nvidia/nemotron-3-nano-omni-30b-a3b-reasoning", "Nemotron-3 Nano Omni 30B", "NVIDIA", "omni", "30B (A3B)", "256K", ["omni", "image-input", "audio-input", "video-input", "reasoning"], "Omni model: text, image, audio & video in one."),
  M("nvidia/ai-synthetic-video-detector", "AI Synthetic Video Detector", "NVIDIA", "vision", "specialized", "—", ["video-input", "deepfake-detection", "classification"], "Detects AI-generated / synthetic video frames.", false),
  M("google/deplot", "DePlot", "Google", "vision", "282M", "—", ["image-input", "charts", "plot-to-table"], "One-shot visual language reasoning for charts/plots.", false),

  // ---- embeddings / retrieval ----
  M("nvidia/embed-qa-4", "Embed QA 4 (E5)", "NVIDIA", "embedding", "338M", "512 tokens", ["embeddings", "retrieval", "reranking"], "Top RAG QA retrieval embedding.", false),
  M("nvidia/nv-embedqa-mistral-7b-v2", "NV-EmbedQA Mistral 7B v2", "NVIDIA", "embedding", "7B", "512 tokens", ["embeddings", "retrieval"], "High-accuracy multilingual QA embeddings.", false),
  M("nvidia/llama-3.2-nv-embedqa-1b-v1", "NV-EmbedQA 1B", "NVIDIA", "embedding", "1B", "8K", ["embeddings", "retrieval"], "Llama-based long-context embedder.", false),
  M("nvidia/llama-3.2-nemoretriever-1b-vlm-embed-v1", "NemoRetriever 1B VLM", "NVIDIA", "embedding", "1B", "8K", ["embeddings", "image-input", "multimodal-retrieval"], "Multimodal (text+image) retrieval embedding.", false),
  M("nvidia/llama-nemotron-embed-vl-1b-v2", "Llama Nemotron Embed VL 1B v2", "NVIDIA", "embedding", "1B", "8K", ["embeddings", "image-input"], "Vision-language embedding model.", false),
  M("nvidia/nemotron-3-embed-1b", "Nemotron-3 Embed 1B", "NVIDIA", "embedding", "1B", "32K", ["embeddings", "retrieval"], "Latest Nemotron text embedder.", false),
  M("snowflake/arctic-embed-l", "Arctic Embed L", "Snowflake", "embedding", "334M", "512 tokens", ["embeddings", "retrieval"], "Strong retrieval embedding baseline.", false),
  M("nvidia/nvclip", "NV-CLIP", "NVIDIA", "embedding", "specialized", "77 tokens", ["embeddings", "image-input", "image-search"], "Image/text joint embedding for image search.", false),

  // ---- safety ----
  M("meta/llama-guard-4-12b", "Llama Guard 4 12B", "Meta", "safety", "12B", "128K", ["moderation", "multimodal"], "Multimodal content safety classifier.", false),
  M("nvidia/llama-3.1-nemoguard-8b-content-safety", "NemoGuard 8B Content Safety", "NVIDIA", "safety", "8B", "8K", ["moderation"], "Content safety guardrail model.", false),
  M("nvidia/llama-3.1-nemoguard-8b-topic-control", "NemoGuard 8B Topic Control", "NVIDIA", "safety", "8B", "8K", ["moderation", "topic-filter"], "Keeps chats on approved topics.", false),
  M("nvidia/llama-3.1-nemotron-safety-guard-8b-v3", "Nemotron Safety Guard 8B v3", "NVIDIA", "safety", "8B", "8K", ["moderation"], "Latest Nemotron safety guard.", false),
  M("nvidia/nemotron-3.5-content-safety", "Nemotron-3.5 Content Safety", "NVIDIA", "safety", "30B (A3B)", "128K", ["moderation"], "MoE safety moderation model.", false),
  M("nvidia/nemotron-4-340b-reward", "Nemotron-4 340B Reward", "NVIDIA", "safety", "340B", "4K", ["reward-model", "ranking"], "Reward model for RLHF pipelines.", false),

  // ---- translation ----
  M("nvidia/riva-translate-4b-instruct", "Riva Translate 4B", "NVIDIA", "translation", "4B", "—", ["translation", "many-languages"], "Neural machine translation model.", true),
  M("nvidia/riva-translate-4b-instruct-v2", "Riva Translate 4B v2", "NVIDIA", "translation", "4B", "—", ["translation"], "Updated translation model.", true),

  // ---- document ----
  M("nvidia/nemotron-parse", "Nemotron Parse", "NVIDIA", "document", "specialized", "—", ["pdf", "ocr", "structured-output"], "Extracts structured JSON from documents.", false),
  M("nvidia/nemotron-parse-2.0", "Nemotron Parse 2.0", "NVIDIA", "document", "specialized", "—", ["pdf", "ocr", "structured-output", "tables"], "Next-gen document parsing.", false),

  // ---- domain ----
  M("writer/palmyra-med-70b", "Palmyra Med 70B", "Writer", "domain", "70B", "72K", ["chat", "medical"], "Medical knowledge assistant."),
  M("writer/palmyra-med-70b-32k", "Palmyra Med 70B 32K", "Writer", "domain", "70B", "32K", ["chat", "medical"], "Medical model, 32K context."),
  M("writer/palmyra-fin-70b-32k", "Palmyra Fin 70B 32K", "Writer", "domain", "70B", "32K", ["chat", "finance"], "Finance domain assistant."),
];
