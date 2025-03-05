const express = require('express');
const cors = require('cors');
const path = require('path');
const aiService = require('./ai_service');
const fileUploadService = require('./file_upload_service');
const app = express();
const port = 5001;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_PROVIDER = process.env.API_PROVIDER || 'openrouter';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

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
                responseData = await aiService.callOpenAI(message, OPENAI_API_KEY);
                break;
            case 'deepseek':
                responseData = await aiService.callDeepSeek(message, DEEPSEEK_API_KEY);
                break;
            default: // 'openrouter'
                responseData = await aiService.callOpenRouter(message, OPENROUTER_API_KEY);
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
            res.status(error.response.status).send(`Error processing request: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            console.error('No response received:', error.request);
            res.status(500).send('No response received from the AI service.');
        } else {
            console.error('Error during request setup:', error.message);
            res.status(500).send(`Error processing request: ${error.message}`);
        }
    }
});

// File upload endpoint
app.post('/upload', fileUploadService.upload.single('file'), async (req, res) => {
    try {
        const result = await fileUploadService.processFileUpload(req, res);
        res.json(result);
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).send(error.message);
    }
});

app.use(express.static(path.join(__dirname, 'client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
