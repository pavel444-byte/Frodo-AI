const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const discordBotToken = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async msg => {
    if (msg.content.startsWith('!ai')) {
        const userMessage = msg.content.slice(3).trim();
        try {
            const response = await axios.post('http://localhost:5001/chat', { message: userMessage });
            const aiResponse = response.data;
            msg.reply(aiResponse);
        } catch (error) {
            console.error('Error sending message to server:', error);
            msg.reply('Error communicating with the AI service.');
        }
    }
});

client.login(discordBotToken);
