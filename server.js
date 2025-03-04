const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post('https://api.openrouter.ai/v1/chat', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      api_key: 'YOUR_OPENROUTER_API_KEY',
    });
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(500).send('Error processing request');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
