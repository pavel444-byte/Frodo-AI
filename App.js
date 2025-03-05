import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const chatDisplayRef = useRef(null);

    // Scroll to bottom of chat on new message
    useEffect(() => {
        if (chatDisplayRef.current) {
            chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
        }
    }, [chat]);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const userMessage = { text: message, sender: 'user' };
        setChat(prevChat => [...prevChat, userMessage]);
        setMessage('');
        setIsTyping(true);

        try {
            const response = await axios.post('http://localhost:5001/chat', {
                message: message,
                fileContent: fileContent,
                searchQuery: searchQuery // Send the search query
            });
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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFileContent(response.data.content);
        } catch (error) {
            console.error('File upload error:', error);
            alert('Error uploading file.');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const results = [];
        let index = fileContent.toLowerCase().indexOf(searchQuery.toLowerCase());
        while (index !== -1) {
            results.push(index);
            index = fileContent.toLowerCase().indexOf(searchQuery.toLowerCase(), index + 1);
        }
        setSearchResults(results);
    };

    const highlightText = (text) => {
        if (!searchQuery || searchResults.length === 0) {
            return text;
        }

        let parts = [];
        let lastIndex = 0;

        searchResults.forEach(index => {
            parts.push(text.substring(lastIndex, index));
            parts.push(<mark key={index}>{text.substring(index, index + searchQuery.length)}</mark>);
            lastIndex = index + searchQuery.length;
        });

        parts.push(text.substring(lastIndex));
        return parts;
    };


    return (
        <div className="App">
            <header className="App-header">
                <h1>AI Chat</h1>
                <div className="chat-container">
                    <div className="chat-display" ref={chatDisplayRef}>
                        {chat.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div className="message ai">Typing...</div>}
                    </div>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleFileUpload}>Upload File</button>
                        {fileContent && (
                            <div className="file-content">
                                <h3>File Content:</h3>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        placeholder="Search file content..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <button onClick={handleSearch}>Search</button>
                                </div>
                                <pre>{highlightText(fileContent)}</pre>
                            </div>
                        )}
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
