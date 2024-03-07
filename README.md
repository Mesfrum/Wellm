# WebLLM Demo

The WebLLM Demo is a web application built using WebLLM, an open-source project that allows running large language models (LLMs) directly in the browser, leveraging WebGPU for hardware acceleration.

## Features

- **Interactive Chat Interface**: Users can enter prompts and receive responses from the loaded LLM in real-time.
- **Model Selection**: The application supports loading multiple LLM models, and users can switch between them with ease.
- **Loading Progress**: A loading spinner and progress bar indicate when the model is being downloaded and initialized.
- **Markdown Rendering**: Responses from the LLM are rendered as Markdown, allowing for formatted text, code blocks, and other formatting options.
- **Syntax Highlighting**: Code blocks in the LLM's responses are syntax-highlighted for better readability.
- **Clear Conversation**: Users can clear the conversation history with a single click.
- **Keyboard Support**: Prompts can be submitted by pressing the "Enter" key, in addition to clicking the "Submit" button.

## Technologies Used

- **WebLLM**: The core library that enables running LLMs in the browser using WebGPU.
- **Tailwind CSS**: A utility-first CSS framework for styling the user interface.
- **Marked.js**: A library used for rendering Markdown content.
- **Prism.js**: A syntax highlighting library for code blocks.

## Installation

1. Clone the repository:

```
git clone https://github.com/your-repo/webllm-demo.git
```

2. Navigate to the project directory:

```
cd webllm-demo
```

3. Install the required dependencies:

```
npm install
```

## Usage

1. Open the `index.html` file in a compatible web browser (WebGPU support required).

2. The application will automatically load the specified LLM model(s) and display the chat interface.

3. Enter your prompts in the input field and click the "Submit" button or press "Enter" to receive responses from the LLM.

4. Use the "Clear" button to reset the conversation history.

5. You can switch between different LLM models by modifying the `myAppConfig` object in the `main.js` file.

## Configuration

The WebLLM Demo application can be configured by modifying the `myAppConfig` object in the `main.js` file. Here's an example configuration:

```javascript
const myAppConfig = {
  model_list: [
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f32_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f32_1-ctx4k_cs1k-webgpu.wasm",
    },
    {
      model_url: "https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.2-q4f16_1-MLC/resolve/main/",
      local_id: "Mistral-7B-Instruct-v0.2-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      required_features: ["shader-f16"],
    },
  ],
};
```

Each object in the `model_list` array represents an LLM model that can be loaded by the application. The properties are:

- `model_url`: The URL of the Hugging Face repository containing the model weights.
- `local_id`: A unique identifier for the model.
- `model_lib_url`: The URL of the WebLLM model library (.wasm file) required for running the model.
- `required_features` (optional): An array of WebGPU features required by the model.

You can add or remove models from the `model_list` array as needed.

## Contributing

Contributions to the WebLLM Demo project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [WebLLM](https://github.com/mlc-ai/web-llm) for providing the core functionality of running LLMs in the browser.
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Marked.js](https://marked.js.org/) for Markdown rendering.
- [Prism.js](https://prismjs.com/) for syntax highlighting.