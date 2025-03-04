// This is a conceptual example and requires further implementation

const Discord = require('discord.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const axios = require('axios'); // Import axios

// Replace with your bot token
const discordBotToken = 'YOUR_DISCORD_BOT_TOKEN';

// Create a new Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
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
