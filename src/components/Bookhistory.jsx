import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Assistentchat from './Assistentchat';
import '../styles/Bookhistory.css';

function Bookhistory({ userId, onPreviewBook }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserHistory(userId);
    }
  }, [userId]);

  const fetchUserHistory = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://book-recomm-backend.onrender.com/recommendations/history?user_id=${userId}`);
      if (response.data && response.data.history) {
        setHistory(response.data.history);
      }
    } catch (error) {
      console.error('Error fetching user history:', error);
      toast.error('Failed to fetch recommendation history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (bookId, bookTitle) => {
    const isConfirmed = window.confirm(`Are you sure you want to remove "${bookTitle}" from your history?`);
    
    if (isConfirmed) {
      try {
        await axios.delete(`https://book-recomm-backend.onrender.com/recommendations/history/${bookId}?user_id=${userId}`);
        setHistory(history.filter(book => book.id !== bookId));
        toast.success('Book removed from history');
      } catch (error) {
        console.error('Error deleting book:', error);
        toast.error('Failed to remove book from history');
      }
    }
  };

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
    <div className="history-section">
      <h2>Recommendation History</h2>
      {loading ? (
        <div className="loader"></div>
      ) : history.length > 0 ? (
        <div className="history-grid">
          {history.map((book, index) => (
            <div key={index} className="history-card">
              <div className="history-book-thumbnail">
                <img
                  src={getImageUrl(book)}
                  alt={book.title}
                  onError={(e) => handleImageError(e, book)}
                  loading="lazy"
                />
              </div>
              <div className="history-book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p className="genre">{book.genre || 'Genre not specified'}</p>
                <p className="year">Published: {book.publication_year}</p>
                <p className="language">Language: {book.languages}</p>
                <p className="date">Added: {new Date(book.created_at).toLocaleDateString()}</p>
                <div className="history-book-actions">
                  {book.preview_link && (
                    <button
                      onClick={() => onPreviewBook(book)}
                      className="preview-button"
                    >
                      Preview Book
                    </button>
                  )}
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
                    onClick={() => handleAssistantClick(book)}
                    className="assistant-button"
                  >
                    Book Assistant
                  </button>
                  <button
                    onClick={() => handleDeleteClick(book.id, book.title)}
                    className="delete-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-history">
          No recommendation history found.
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
}

export default Bookhistory;