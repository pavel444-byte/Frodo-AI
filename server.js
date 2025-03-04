const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
    console.error("Error: OPENROUTER_API_KEY environment variable not set.");
    process.exit(1); // Exit the process if the API key is not set
}

console.warn("Server is running with API key from environment variables.");

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).send('Message is required');
    }

    try {
        const response = await axios.post(
            'https://api.openrouter.ai/api/v1/chat/completions',
            {
                model: 'mistralai/Mistral-7B-Instruct-v0.1',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            res.json(response.data.choices[0].message.content);
        } else {
            console.error('Unexpected response format:', response.data);
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
