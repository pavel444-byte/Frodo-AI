import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.post('http://localhost:5000/chat', { message });
        setResponse(response.data);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };

    fetchResponse();
  }, [message]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello from the frontend!</h1>
        <p>{response}</p>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
      </header>
    </div>
  );
}

export default App;
