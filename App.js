import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const userMessage = { text: message, sender: 'user' };
        setChat(prevChat => [...prevChat, userMessage]);
        setMessage('');
        setIsTyping(true);

        try {
            const response = await axios.post('http://localhost:5001/chat', { message: message });
            const aiMessage = { text: response.data, sender: 'ai' };
            setChat(prevChat => [...prevChat, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorAI = { text: "Sorry, I'm having trouble connecting to the server.", sender: 'ai' };
            setChat(prevChat => [...prevChat, errorAI]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>AI Chat</h1>
                <div className="chat-container">
                    <div className="chat-display">
                        {chat.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className="message ai">Typing...</div>}
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            value={message}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="chat-input"
                        />
                        <button onClick={sendMessage} className="send-button">Send</button>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
