import "./style.css";
import * as webllm from "@mlc-ai/web-llm";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const chatContainer = document.getElementById("chat-container");
const promptLabel = document.getElementById("prompt-label");
const generateLabel = document.getElementById("generate-label");
const promptInput = document.getElementById("prompt-input");
const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear-button");
const loadingIndicator = document.getElementById("loading");
const statsLabel = document.getElementById("stats-label");

const body = document.querySelector("body");
const darkModeToggle = document.getElementById("dark-mode-toggle");

function saveThemePreference(isDarkMode) {
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
}

function getThemePreference() {
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  return isDarkMode === null ? false : isDarkMode;
}

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
  const dot = document.querySelector(".dot");
  const isDarkMode = body.classList.contains("dark-mode");
  if (isDarkMode) {
    dot.classList.add("translate-x-6", "bg-blue-600");
  } else {
    dot.classList.remove("translate-x-6", "bg-blue-600");
  }
  saveThemePreference(isDarkMode);
}

darkModeToggle.addEventListener("change", toggleDarkMode);

function setLoading(isLoading) {
  if (isLoading) {
    loadingIndicator.classList.remove("hidden");
  } else {
    loadingIndicator.classList.add("hidden");
  }
}

function setLabel(label, text) {
  label.innerHTML = marked(text, {
    langPrefix: "language-",
    highlight: function (code, lang) {
      const language = Prism.languages[lang] || Prism.languages.markup;
      return Prism.highlight(code, language, lang);
    },
  });
}

async function main() {
  const chat = new webllm.ChatModule();

  const isDarkMode = getThemePreference();
  if (isDarkMode) {
    body.classList.add("dark-mode");
    const dot = document.querySelector(".dot");
    dot.classList.add("translate-x-6", "bg-blue-600");
  }

  chat.setInitProgressCallback((report) => {
    setLabel(promptLabel, report.text);
  });

  const myAppConfig = {
    model_list: [
      {
        model_url:
          "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f32_1-MLC/resolve/main/",
        local_id: "Llama-2-7b-chat-hf-q4f32_1",
        model_lib_url:
          "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f32_1-ctx4k_cs1k-webgpu.wasm",
      },
      // Add other models as needed
    ],
  };

  setLoading(true);
  const selectedModel = "Llama-2-7b-chat-hf-q4f32_1";
  await chat.reload(selectedModel, undefined, myAppConfig);
  setLoading(false);

  const generateProgressCallback = (_step, message) => {
    setLabel(generateLabel, message);
  };

  let genConfig = {
    presence_penalty: 0.1,
    frequency_penalty: 0.1,
  };

  const handleSubmit = async () => {
    const prompt = promptInput.value.trim();
    if (prompt) {
      setLabel(promptLabel, `**You:** ${prompt}`);
      generateLabel.innerHTML = "";
      const reply = await chat.generate(
        prompt,
        generateProgressCallback,
        1,
        genConfig
      );
      setLabel(generateLabel, `**Assistant:** ${reply}`);
      promptInput.value = "";
      statsLabel.textContent = await chat.runtimeStatsText();
    }
  };

  const clearConversation = () => {
    promptLabel.innerHTML = "";
    generateLabel.innerHTML = "";
    promptInput.value = "";
    statsLabel.textContent = "";
  };

  submitButton.addEventListener("click", handleSubmit);
  clearButton.addEventListener("click", clearConversation);
  promptInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  });
}

main();
