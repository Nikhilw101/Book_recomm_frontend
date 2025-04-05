import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Assistentchat from './Assistentchat';
import '../styles/Randombookgene.css';

const Randombookgene = () => {
  const [books, setBooks] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  useEffect(() => {
    const fetchRandomBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recommendations/auto-recommend?user_id=19');
        setBooks(response.data.recommendations);
        setPreferences(response.data.preferences_used);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching random books:', error);
        toast.error('Failed to fetch random books');
        setLoading(false);
      }
    };

    fetchRandomBooks();
  }, []);

  const handleAssistantClick = (book) => {
    setSelectedBook(book);
    setShowAssistant(true);
  };

  const handleCloseAssistant = () => {
    setShowAssistant(false);
    setSelectedBook(null);
  };

  if (loading) {
    return <div className="loading-spinner">Loading books...</div>;
  }

  return (
    <div className="random-books-section">
      <h2>Discover New Books</h2>
      
      {preferences && (
        <div className="preferences-summary">
          <h3>Based on Popular Preferences</h3>
          <div className="preferences-details">
            <div className="preferences-group">
              <h4>Top Authors</h4>
              <ul>
                {preferences.top_authors.map((author, index) => (
                  <li key={index}>{author}</li>
                ))}
              </ul>
            </div>
            <div className="preferences-group">
              <h4>Top Genres</h4>
              <ul>
                {preferences.top_genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="books-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <p className="genre">{book.genre}</p>
              <p className="year">Published: {book.publication_year}</p>
              <p className="language">Language: {book.languages}</p>
              <p className="source">Source: {book.source}</p>
              <div className="book-actions">
                {book.download_link && (
                  <a
                    href={book.download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-button"
                  >
                    Download
                  </a>
                )}
                <button
                  className="assistant-button"
                  onClick={() => handleAssistantClick(book)}
                >
                  Book Assistant
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAssistant && selectedBook && (
        <Assistentchat
          book={selectedBook}
          onClose={handleCloseAssistant}
        />
      )}
    </div>
  );
};

export default Randombookgene;