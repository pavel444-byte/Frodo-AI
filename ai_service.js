const axios = require('axios');

async function callOpenRouter(message, OPENROUTER_API_KEY) {
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

async function callOpenAI(message, OPENAI_API_KEY) {
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

async function callDeepSeek(message, DEEPSEEK_API_KEY) {
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

module.exports = {
    callOpenRouter,
    callOpenAI,
    callDeepSeek
};
