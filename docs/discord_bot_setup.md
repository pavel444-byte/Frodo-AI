# Setting up a Discord Bot

Follow these steps to create a Discord bot:

1.  **Go to the Discord Developer Portal:** Open your web browser and navigate to [https://discord.com/developers/applications](https://discord.com/developers/applications).
2.  **Create a new application:** Click the "New Application" button.
3.  **Enter a name for your application:** Choose a name for your bot and enter it in the "Name" field.
4.  **Create a bot user:** In the left-hand menu, navigate to "Bot" and click "Add Bot". Then, click "Yes, do it!".
5.  **Get your bot token:** Under the "Bot" section, you will find your bot's token. Click the "Copy" button to copy the token. **Keep this token secret!**
6.  **Enable Message Content Intent:** In the "Privileged Gateway Intents" section, enable the "Message Content Intent". This is required for your bot to read messages.
7.  **Add the bot to your server:**
    *   Go to the "OAuth2" -> "URL Generator" section.
    *   Select the "bot" scope.
    *   Select the "Send Messages" and "Read Message History" permissions (and any other permissions your bot needs).
    *   Copy the generated URL and paste it into your web browser.
    *   Select the server you want to add the bot to and click "Authorize".
8.  **Add the token to your .env file:** Add the token you received to your `.env` file as `DISCORD_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN` replacing `YOUR_DISCORD_BOT_TOKEN` with the actual token.

Now you can use the token in your `discord_integration.js` file to connect to your bot.
