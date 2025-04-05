import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Assistentchat.css';

function Assistentchat({ book, onClose }) {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'Hindi' },
    { code: 'marathi', name: 'Marathi' }
  ];

  const fetchBookDescription = async () => {
    if (!book) return;

    setLoading(true);
    setError(null);
    try {
      console.log('Sending request with book data:', {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publication_year: book.publication_year,
        language: book.language
      });

      const response = await axios.post('https://book-recomm-backend.onrender.com/book-assistant/book-assistant', {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publication_year: book.publication_year,
        language: book.language
      });

      console.log('Received response:', response.data);

      if (response.data && response.data.description && response.data.description.description) {
        setDescription(response.data.description.description);
        toast.success('Book description fetched successfully');
      } else {
        setError('No description data received from the server');
        toast.error('No description available');
      }
    } catch (error) {
      console.error('Error fetching book description:', error);
      setError(error.response?.data?.message || 'Failed to fetch book description');
      toast.error('Failed to fetch book description');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (book) {
      fetchBookDescription();
    }
  }, [book]);

  const renderDescription = () => {
    if (loading) {
      return (
        <div className="loader"></div>
      );
    }

    if (error) {
      return (
        <div className="error-message">
          <p>{error}</p>
          <button 
            className="retry-button"
            onClick={fetchBookDescription}
          >
            Retry
          </button>
        </div>
      );
    }

    if (!description) {
      return (
        <div className="no-description">
          <p>No description available for this book.</p>
          <button 
            className="retry-button"
            onClick={fetchBookDescription}
          >
            Try Again
          </button>
        </div>
      );
    }

    const currentDescription = description[selectedLanguage];
    if (!currentDescription) {
      return (
        <div className="no-description">
          <p>No description available in {languages.find(lang => lang.code === selectedLanguage)?.name}.</p>
        </div>
      );
    }

    return (
      <div className="description-content">
        <div className="description-text">
          {currentDescription}
        </div>
        <div className="description-actions">
          <button 
            className="refresh-button"
            onClick={fetchBookDescription}
            disabled={loading}
          >
            Refresh Description
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`assistant-chat-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="assistant-chat-header">
        <div className="header-left">
          <h2>Book Assistant</h2>
          <span className="book-title-mini">{book?.title}</span>
        </div>
        <div className="header-right">
          <button 
            className="minimize-button"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="book-info-summary">
            <h3>{book?.title}</h3>
            <p>by {book?.author}</p>
            <p>{book?.genre} • {book?.publication_year}</p>
          </div>

          <div className="language-selector">
            <label>Select Language:</label>
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="chat-content">
            {renderDescription()}
          </div>
        </>
      )}
    </div>
  );
}

export default Assistentchat;