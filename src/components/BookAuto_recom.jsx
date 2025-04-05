import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Assistentchat from './Assistentchat';
import '../styles/BookAuto-recom.css';

const BookAuto_recom = ({ userId, onPreviewBook }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  const fetchAutoRecommendations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://book-recomm-backend.onrender.com/recommendations/auto-recommend?user_id=${userId}`);
      setRecommendations(response.data.recommendations);
      setPreferences(response.data.metadata);
      toast.success('Recommendations updated successfully');
    } catch (error) {
      console.error('Error fetching auto recommendations:', error);
      toast.error('Failed to fetch auto recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAutoRecommendations();
    }
  }, [userId]);

  const handleAssistantClick = (book) => {
    setSelectedBook(book);
    setShowAssistant(true);
  };

  const handleCloseAssistant = () => {
    setShowAssistant(false);
    setSelectedBook(null);
  };

  const getImageUrl = (book) => {
    if (book.thumbnail) {
      return book.thumbnail;
    }
    if (book.preview_link) {
      const bookId = book.preview_link.match(/id=([^&]+)/)?.[1];
      if (bookId) {
        return `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;
      }
    }
    return `https://via.placeholder.com/150x200?text=${encodeURIComponent(book.title.substring(0, 20))}`;
  };

  const handleImageError = (e, book) => {
    if (book.preview_link) {
      const bookId = book.preview_link.match(/id=([^&]+)/)?.[1];
      if (bookId) {
        e.target.src = `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;
      } else {
        e.target.src = `https://via.placeholder.com/150x200?text=${encodeURIComponent(book.title.substring(0, 20))}`;
      }
    } else {
      e.target.src = `https://via.placeholder.com/150x200?text=${encodeURIComponent(book.title.substring(0, 20))}`;
    }
  };

  return (
    <div className="auto-recommendations-section">
      <div className="section-header">
        <h2 className="text-light mb-0">Personalized Recommendations</h2>
      </div>
      
      {preferences && (
        <div className="preferences-summary card bg-dark text-light">
          <div className="card-body">
            <h3 className="card-title">Based on Your Reading History</h3>
            <div className="preferences-details">
              <div className="preferences-group card bg-dark border-secondary">
                <div className="card-body">
                  <h4 className="card-title text-primary">Favorite Genres</h4>
                  <ul className="list-unstyled">
                    {preferences.top_genres.map((genre, index) => (
                      <li key={index} className="text-light">{genre}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="preferences-group card bg-dark border-secondary">
                <div className="card-body">
                  <h4 className="card-title text-primary">Preferred Authors</h4>
                  <ul className="list-unstyled">
                    {preferences.top_authors.map((author, index) => (
                      <li key={index} className="text-light">{author}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="preferences-group card bg-dark border-secondary">
                <div className="card-body">
                  <h4 className="card-title text-primary">Reading Patterns</h4>
                  <ul className="list-unstyled">
                    <li className="text-light">Genre Diversity: {preferences.reading_patterns.genre_diversity}</li>
                    <li className="text-light">Author Diversity: {preferences.reading_patterns.author_diversity}</li>
                    <li className="text-light">Preferred Languages: {preferences.preferred_languages.join(', ')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loader"></div>
      ) : recommendations.length > 0 ? (
        <div className="recommendations-grid">
          {recommendations.map((book, index) => (
            <div key={index} className="recommendation-card">
              <div className="book-thumbnail">
                <img
                  src={getImageUrl(book)}
                  alt={book.title}
                  onError={(e) => handleImageError(e, book)}
                  loading="lazy"
                />
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author"><strong>Author:</strong> {book.author}</p>
                <p className="genre"><strong>Genre:</strong> {book.genre || 'Genre not specified'}</p>
                <p className="year"><strong>Published:</strong> {book.publication_year}</p>
                <p className="language"><strong>Language:</strong> {book.language}</p>
                <div className="book-actions">
                  <button
                    className="preview-button"
                    onClick={() => onPreviewBook(book)}
                  >
                    Preview Book
                  </button>
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
      ) : (
        <div className="no-recommendations">
          <h3>No Recommendations Yet</h3>
          <p>Start reading some books to get personalized recommendations!</p>
        </div>
      )}

      {showAssistant && selectedBook && (
        <Assistentchat
          book={selectedBook}
          onClose={handleCloseAssistant}
        />
      )}
    </div>
  );
};

export default BookAuto_recom;