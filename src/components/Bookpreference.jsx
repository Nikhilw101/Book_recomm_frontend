import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Assistentchat from './Assistentchat';
import '../styles/Bookpreference.css';

function Bookpreference({ userId, onPreferencesSaved }) {
  const [loading, setLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publication_year: '',
    language: '',
    free_books_only: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAssistantClick = (book) => {
    setSelectedBook(book);
    setShowAssistant(true);
  };

  const handleCloseAssistant = () => {
    setShowAssistant(false);
    setSelectedBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        user_id: parseInt(userId),
        title: formData.title.trim(),
        author: formData.author.trim(),
        genre: formData.genre.trim(),
        publication_year: formData.publication_year ? parseInt(formData.publication_year) : null,
        language: formData.language || 'en',
        free_books_only: Boolean(formData.free_books_only)
      };

      console.log('Sending data:', requestData);

      const response = await axios.post('https://book-recomm-backend-1.onrender.com/recommendations/preferences', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        if (response.data.recommendations && response.data.recommendations.length > 0) {
          setPreferenceId(response.data.preference_id);
          onPreferencesSaved(response.data.recommendations);
          toast.success(response.data.message || 'Preferences saved successfully!');
        } else {
          const bookDetails = {
            title: formData.title,
            author: formData.author,
            genre: formData.genre,
            publication_year: formData.publication_year,
            language: formData.language
          };
          handleAssistantClick(bookDetails);
          toast.info('No recommendations found. Showing book assistant for more information.');
        }
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error(error.response?.data?.message || 'Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="preferences-form">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            Saving preferences...
          </div>
        </div>
      )}
      <h2>Book Preferences</h2>
      {preferenceId && (
        <div className="preference-id">
          Preference ID: {preferenceId}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter genre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="publication_year">Publication Year</label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={formData.publication_year}
            onChange={handleChange}
            placeholder="Enter year"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Select language</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="ta">Tamil</option>
          </select>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="free_books_only"
            name="free_books_only"
            checked={formData.free_books_only}
            onChange={handleChange}
          />
          <label htmlFor="free_books_only">Show only free books</label>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Preferences'}
        </button>
      </form>

      {showAssistant && selectedBook && (
        <Assistentchat
          book={selectedBook}
          onClose={handleCloseAssistant}
        />
      )}
    </div>
  );
}

export default Bookpreference;