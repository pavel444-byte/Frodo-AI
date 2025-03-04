# Frodo-AI Chat Application

FrodoAI is a versatile AI chat application designed for web, with future integrations planned for platforms like Discord and Telegram. This repository houses the complete source code for the web interface and the backend server, providing a foundation for building and extending the application.

## Key Features

*   **Multi-Platform Support (Planned):** Designed with future integrations in mind, including Discord, Telegram, Slack, and Facebook.
*   **Configurable AI Provider:** Easily switch between different AI providers like OpenRouter, OpenAI, and DeepSeek.
*   **Secure API Key Management:** Utilizes environment variables for secure storage and management of API keys.
*   **Modular Design:** Well-structured codebase for easy understanding and modification.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (version >= 14)
*   [npm](https://www.npmjs.com/) (version >= 6) or [yarn](https://yarnpkg.com/)

## Installation

Follow these steps to get the application up and running:

1.  **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd ai-chat
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

    or, if you prefer using Yarn:

    ```sh
    yarn install
    ```

## Configuration

The application relies on environment variables for configuration. Here's how to set them up:

1.  **Create a `.env` file:** In the root directory of the project, create a file named `.env`.

2.  **Configure AI Provider:**
    *   Set the `API_PROVIDER` variable to your preferred AI provider. Options include:
        *   `openrouter` (default): Uses the OpenRouter API. Requires `OPENROUTER_API_KEY`.
        *   `openai`: Uses the OpenAI API. Requires `OPENAI_API_KEY`.
        *   `deepseek`: Uses the DeepSeek API. Requires `DEEPSEEK_API_KEY`.
    *   Add the corresponding API key for your chosen provider:

        ```
        API_PROVIDER=openai
        OPENAI_API_KEY=YOUR_OPENAI_API_KEY
        #OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY #Uncomment if using OpenRouter
        ```

3.  **Configure Platform Integrations (Optional):**
    *   If you plan to use Discord or Telegram integrations, add the following:
        *   `DISCORD_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN`
        *   `TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN`
    *   Placeholders for other platforms are also available:
        *   `SLACK_BOT_TOKEN=YOUR_SLACK_BOT_TOKEN`
        *   `FACEBOOK_PAGE_TOKEN=YOUR_FACEBOOK_PAGE_TOKEN`

    **Important:** Treat your `.env` file with utmost care. **Never commit it to a public repository**, as it contains sensitive API keys and tokens.

## Running the Application

1.  **Start the backend server:**

    ```sh
    node server.js
    ```

    This command starts the Express server, which handles the AI API interactions. It runs on port 5000 by default. Before running this command, ensure that you have set the necessary API key environment variable. The server will exit if the API key is missing.

2.  **Start the frontend development server:**

    ```sh
    npm start
    ```

    This command launches the React development server, which serves the web interface. It typically runs on port 3000.

3.  **Access the application:**

    Open your web browser and navigate to Url if shown in the command system to start chatting with the AI!


