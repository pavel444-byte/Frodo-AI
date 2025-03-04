# Frodo-AI Chat Application

FrodoAI is a web-based AI chat application with planned integrations for Discord and Telegram. This repository contains the code for the web interface and the backend server.

## Prerequisites

- [Node.js](https://nodejs.org/) (version >= 14)
- [npm](https://www.npmjs.com/) (version >= 6) or [yarn](https://yarnpkg.com/)

## Installation

1.  Clone the repository:

    ```sh
    git clone <repository-url>
    cd ai-chat
    ```

2.  Install dependencies:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

## Configuration

1.  **Set up environment variables:**

    *   Create a `.env` file in the root directory.
    *   Set the `API_PROVIDER` environment variable to choose the AI provider:
        *   `openrouter` (default): Uses the OpenRouter API. Requires `OPENROUTER_API_KEY`.
        *   `openai`: Uses the OpenAI API. Requires `OPENAI_API_KEY`.
        *   `deepseek`: Uses the DeepSeek API. Requires `DEEPSEEK_API_KEY`.
    *   Add the API key for your chosen provider to the `.env` file:

        ```
        API_PROVIDER=openai
        OPENAI_API_KEY=YOUR_OPENAI_API_KEY
        #OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY #Uncomment if using OpenRouter
        ```

    **Important:** Never commit your `.env` file to a public repository. This file contains sensitive information.

## Running the Application

1.  **Start the backend server:**

    ```sh
    node server.js
    ```

    This starts the Express server on port 5000 (by default). Ensure the necessary API key environment variable (`OPENROUTER_API_KEY`, `OPENAI_API_KEY`, or `DEEPSEEK_API_KEY`) is set before running this command. The server will exit if the API key is not found.

2.  **Start the frontend development server:**

    ```sh
    npm start
    ```

    This starts the React development server, typically on port 3000.

3.  **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

## Project Structure

