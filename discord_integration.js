// This is a conceptual example and requires further implementation

const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios'); // Import axios
require('dotenv').config(); // Load environment variables

// Replace with your bot token
const discordBotToken = process.env.DISCORD_BOT_TOKEN;

// Create a new Discord client
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
        const userMessage = msg.content.slice(3).trim(); // Remove '!ai' prefix
        // Send the message to your server's /chat endpoint
        try {
            const response = await axios.post('http://localhost:5000/chat', { message: userMessage });
            const aiResponse = response.data;
            msg.reply(aiResponse);
        } catch (error) {
            console.error('Error sending message to server:', error);
            msg.reply('Error communicating with the AI service.');
        }
    }
});

// Log in to Discord with your client's token
client.login(discordBotToken);
