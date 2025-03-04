const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config(); // Load environment variables

app.use(cors());
app.use(express.json());

const API_PROVIDER = process.env.API_PROVIDER || 'openrouter'; // Default to OpenRouter
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Add OpenAI API Key
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY; // Add DeepSeek API Key

if (API_PROVIDER === 'openrouter' && !OPENROUTER_API_KEY) {
    console.error("Error: OPENROUTER_API_KEY environment variable not set.");
    process.exit(1);
}

if (API_PROVIDER === 'openai' && !OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY environment variable not set.");
    process.exit(1);
}

if (API_PROVIDER === 'deepseek' && !DEEPSEEK_API_KEY) {
    console.error("Error: DEEPSEEK_API_KEY environment variable not set.");
    process.exit(1);
}


console.warn(`Server is running with API provider: ${API_PROVIDER}`);

app.get('/test-env', (req, res) => {
    if (process.env.OPENROUTER_API_KEY) {
        res.status(200).send('Environment variables are correctly loaded.');
    } else {
        res.status(500).send('Environment variables are NOT loaded!');
    }
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send('Message is required');
    }

    try {
        let responseData;

        switch (API_PROVIDER) {
            case 'openai':
                responseData = await callOpenAI(message);
                break;
            case 'deepseek':
                responseData = await callDeepSeek(message);
                break;
            default: // 'openrouter'
                responseData = await callOpenRouter(message);
                break;
        }

       if (responseData && responseData.choices && responseData.choices.length > 0) {
            const aiMessage = responseData.choices[0].message.content;
            res.json(aiMessage);
        } else {
            console.error('Unexpected response format:', responseData);
            res.status(500).send('Unexpected response format from the AI service.');
        }

    } catch (error) {
        console.error('Error fetching response:', error);
        if (error.response) {
            console.error('Error ', error.response.data);
            console.error('Error status:', error.response.status);
            res.status(error.response.status).send(`Error processing request: ${error.response.data.error}`);
        } else if (error.request) {
            console.error('No response received:', error.request);
            res.status(500).send('No response received from the AI service.');
        } else {
            console.error('Error during request setup:', error.message);
            res.status(500).send(`Error processing request: ${error.message}`);
        }
    }
});

async function callOpenRouter(message) {
    try {
        const response = await axios.post(
            'https://api.openrouter.ai/api/v1/chat/completions',
            {
                model: 'mistralai/Mistral-7B-Instruct-v0.1',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('OpenRouter API Error:', error);
        throw error;
    }
}

async function callOpenAI(message) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw error;
    }
}

async function callDeepSeek(message) {
    try {
        const response = await axios.post(
            'https://api.deepseek.com/v1/chat/completions',
            {
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('DeepSeek API Error:', error);
        throw error;
    }
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
