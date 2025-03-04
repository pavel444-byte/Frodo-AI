# Frodo-AI Chat Application

FrodoAI is an AI chat application that is currently available on the web. Discord and Telegram integrations are planned for the future. This repository contains the code for the web-based chat interface.

## Prerequisites

- Node.js (version >= 14)
- npm (version >= 6) or yarn

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

    *   Create a `.env` file in the root directory of the `ai-chat` folder.
    *   Add your OpenRouter API key to the `.env` file:

        ```
        OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
        ```

    *Note:* It is crucial to keep your API key secure. Never commit your `.env` file to a public repository.

## Running the Application

1.  Start the backend server:

    ```sh
    npm start
    ```

    This command will start the React development server, usually on port 3000.

2.  Start the server (if it's not already running):

    In a separate terminal, navigate to the directory containing `server.js` and run:

    ```sh
    node server.js
    ```

    This will start the Express server, by default on port 5000.

3.  Open your browser and navigate to `http://localhost:3000` to access the chat application.

## Project Structure

