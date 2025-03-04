const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(telegramBotToken, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    try {
        const response = await axios.post('http://localhost:5001/chat', { message: userMessage });
        const aiResponse = response.data;

    bot.sendMessage(chatId, aiResponse);
    } catch (error) {
        console.error('Error sending message to server:', error);
        bot.sendMessage(chatId, 'Error communicating with the AI service.');
    }
});
