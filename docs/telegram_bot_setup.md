# Setting up a Telegram Bot

Follow these steps to create a Telegram bot using BotFather:

1.  **Open Telegram and search for BotFather:** BotFather is the official Telegram bot for creating and managing bots.
2.  **Start a chat with BotFather:** Click "Start" or send the `/start` command.
3.  **Create a new bot:** Send the `/newbot` command to BotFather.
4.  **Choose a name for your bot:** BotFather will ask you for a name. This is the display name of your bot.
5.  **Choose a username for your bot:** BotFather will ask you for a username. This must be unique and end in "bot" or "Bot".
6.  **Receive your bot token:** If the username is available, BotFather will create your bot and provide you with a token. This token is essential for controlling your bot via code.  **Keep this token secret!**
7.  **Set a description and profile picture (Optional):** You can use BotFather to set a description and profile picture for your bot using the `/setdescription` and `/setuserpic` commands, respectively.
8.  **Add the token to your .env file:** Add the token you received to your `.env` file as `TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN` replacing `YOUR_TELEGRAM_BOT_TOKEN` with the actual token.

Now you can use the token in your `telegram_integration.js` file to connect to your bot.
