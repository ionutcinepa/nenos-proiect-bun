import React, { useState } from 'react';
import QuestionInput from './components/QuestionInput';
import Responses from './components/Responses';
import './App.css';

const App = () => {
  const [documentSummary, setDocumentSummary] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [history, setHistory] = useState([]); // History for conversation
  const [cohereAnswer, setCohereAnswer] = useState('');
  const [nlpCloudAnswer, setNlpCloudAnswer] = useState('');

  const handleFileUpload = (summary, error) => {
    setDocumentSummary(summary || '');
    setErrorMessage(error || '');
  };

  const handleQuestionResponse = (question, cohere, nlpCloud) => {
    setCohereAnswer(cohere || '');
    setNlpCloudAnswer(nlpCloud || '');

    // Update conversation history
    setHistory((prevHistory) => [
      ...prevHistory,
      { question, cohereAnswer: cohere, nlpCloudAnswer: nlpCloud },
    ]);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <h1>AI Assistant</h1>
      </header>

      {/* Main Content Section */}
      <main className="content">
        {errorMessage && <p className="error">{errorMessage}</p>}
        {documentSummary && <p className="summary">{documentSummary}</p>}
        <div className="chat-history">
          {history.map((entry, index) => (
            <div key={index} className="chat-entry">
              <p className="chat-question"><strong>User:</strong> {entry.question}</p>
              {entry.cohereAnswer && (
                <p className="chat-response"><strong>Cohere:</strong> {entry.cohereAnswer}</p>
              )}
              {entry.nlpCloudAnswer && (
                <p className="chat-response"><strong>NLP Cloud:</strong> {entry.nlpCloudAnswer}</p>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Bar Section */}
      <div className="bottom-bar">
        <QuestionInput onFileUpload={handleFileUpload} onResponse={handleQuestionResponse} />
      </div>
    </div>
  );
};

export default App;
