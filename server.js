const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Warning about API key security
console.warn("Warning: Never commit your API key directly in the code. Use environment variables instead.");

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send('Message is required');
    }
    try {
        const apiKey = process.env.OPENROUTER_API_KEY || 'YOUR_OPENROUTER_API_KEY'; // Use environment variable
        const response = await axios.post('https://api.openrouter.ai/api/v1/chat/completions', {
            model: 'mistralai/Mistral-7B-Instruct-v0.1',
            messages: [{ role: 'user', content: message }],
            // api_key: 'YOUR_OPENROUTER_API_KEY', // Use environment variable
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            }
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            res.json(response.data.choices[0].message.content);
        } else {
            console.error('Unexpected response format:', response.data);
            res.status(500).send('Unexpected response format from the AI service.');
        }
    } catch (error) {
        console.error('Error fetching response:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error ', error.response.data);
            console.error('Error status:', error.response.status);
            res.status(error.response.status).send(`Error processing request: ${error.response.data.error}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            res.status(500).send('No response received from the AI service.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error during request setup:', error.message);
            res.status(500).send(`Error processing request: ${error.message}`);
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
