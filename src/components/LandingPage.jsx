import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarS from './NavbarS';
import BookAuto_recom from './BookAuto_recom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    setIsLoggedIn(!!userId);
  }, [userId]);

  const handlePreviewClick = (book) => {
    setSelectedBook(book);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedBook(null);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  // Random book quotes for logged-in users
  const bookQuotes = [
    { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
    { text: "That's the thing about books. They let you travel without moving your feet.", author: "Jhumpa Lahiri" },
    { text: "Books are a uniquely portable magic.", author: "Stephen King" },
    { text: "One must always be careful of books, and what is inside them, for words have the power to change us.", author: "Cassandra Clare" },
    { text: "I have always imagined that Paradise will be a kind of library.", author: "Jorge Luis Borges" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
    { text: "Reading is essential for those who seek to rise above the ordinary.", author: "Jim Rohn" }
  ];

  const randomQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];

  return (
    <div className="landing-page">
      <NavbarS />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Favorite Book</h1>
          <p className="hero-subtitle">
            Personalized book recommendations tailored to your preferences, powered by advanced AI.
          </p>
          {!isLoggedIn && (
            <div className="hero-buttons">
              <Link to="/loginP" className="hero-button login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/signupP" className="hero-button signup">
                <i className="fas fa-user-plus"></i> Sign Up
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="main-content-section">
        {isLoggedIn ? (
          <div className="user-recommendations">
            <div className="quote-container">
              <p className="quote-text">"{randomQuote.text}"</p>
              <p className="quote-author">— {randomQuote.author}</p>
            </div>
            <h2>Your Personalized Recommendations</h2>
            <BookAuto_recom userId={userId} onPreviewBook={handlePreviewClick} />
          </div>
        ) : (
          <>
            {/* Features Section */}
            <div className="features-section">
              <h2>Why Choose Book Recommender?</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <i className="fas fa-brain"></i>
                  <h3>AI-Powered Recommendations</h3>
                  <p>Our advanced algorithm analyzes your preferences to suggest books you'll love.</p>
                </div>
                <div className="feature-card">
                  <i className="fas fa-user-cog"></i>
                  <h3>Personalized Experience</h3>
                  <p>Get recommendations tailored to your reading history, interests, and preferences.</p>
                </div>
                <div className="feature-card">
                  <i className="fas fa-globe"></i>
                  <h3>Multi-Language Support</h3>
                  <p>Access book descriptions and recommendations in your preferred language.</p>
                </div>
                <div className="feature-card">
                  <i className="fas fa-robot"></i>
                  <h3>AI Assistant</h3>
                  <p>Get detailed book information and summaries with our intelligent assistant.</p>
                </div>
              </div>
            </div>

            {/* How It Works Section */}
            <div className="how-it-works-section">
              <h2>How Our Model Works</h2>
              <div className="steps-container">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Create Your Profile</h3>
                    <p>Sign up and tell us about your reading preferences, favorite genres, and authors.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>AI Analysis</h3>
                    <p>Our algorithm analyzes your preferences and matches them with our extensive book database.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Personalized Recommendations</h3>
                    <p>Receive a curated list of books that align with your interests and reading history.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Explore and Discover</h3>
                    <p>Browse recommendations, read descriptions, and discover new authors and genres.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalization Section */}
            <div className="personalization-section">
              <h2>Personalized Book Recommendations</h2>
              <div className="personalization-content">
                <div className="personalization-text">
                  <h3>Books Tailored Just For You</h3>
                  <p>Our recommendation engine considers multiple factors to find the perfect books for you:</p>
                  <p>• Your reading history and preferences</p>
                  <p>• Genre interests and favorite authors</p>
                  <p>• Reading level and complexity preferences</p>
                  <p>• Similar books you've enjoyed in the past</p>
                  <p>• Current trends and popular books in your preferred genres</p>
                </div>
                <div className="personalization-image">
                  <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Personalized recommendations" />
                </div>
              </div>
            </div>

            {/* Assistant Section */}
            <div className="assistant-section">
              <h2>AI Assistant for Book Information</h2>
              <div className="assistant-content">
                <div className="assistant-image">
                  <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="AI Assistant" />
                </div>
                <div className="assistant-text">
                  <h3>Your Personal Book Guide</h3>
                  <p>Our AI assistant provides detailed information about books in multiple languages:</p>
                  <p>• Comprehensive book summaries and descriptions</p>
                  <p>• Author information and background</p>
                  <p>• Similar book recommendations</p>
                  <p>• Reading level and complexity analysis</p>
                  <p>• Available in multiple languages for global readers</p>
                  <div className="language-buttons">
                    <button className="language-button">English</button>
                    <button className="language-button">Spanish</button>
                    <button className="language-button">French</button>
                    <button className="language-button">German</button>
                    <button className="language-button">Chinese</button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
              <div className="cta-content">
                <h2 className="cta-title">Ready to Discover Your Next Favorite Book?</h2>
                <p className="cta-subtitle">Join thousands of readers who have found their perfect books with our personalized recommendations.</p>
                <Link to="/signupP" className="cta-button">
                  <i className="fas fa-rocket"></i> Get Started Now
                </Link>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Preview Modal */}
      {showPreview && selectedBook && (
        <div className="preview-modal-overlay">
          <div className="preview-modal">
            <div className="preview-modal-header">
              <h3>{selectedBook.title}</h3>
              <button className="close-button" onClick={handleClosePreview}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="preview-modal-content">
              <div className="preview-book-info">
                <img
                  src={selectedBook.thumbnail}
                  alt={selectedBook.title}
                  className="preview-book-thumbnail"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x200?text=No+Image';
                  }}
                />
                <div className="preview-book-details">
                  <p><strong>Author:</strong> {selectedBook.author}</p>
                  <p><strong>Genre:</strong> {selectedBook.genre}</p>
                  <p><strong>Publication Year:</strong> {selectedBook.publication_year}</p>
                  <p><strong>Language:</strong> {selectedBook.language}</p>
                  <div className="preview-actions">
                    {selectedBook.preview_link && (
                      <a
                        href={selectedBook.preview_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="preview-button"
                      >
                        <i className="fas fa-external-link-alt"></i> View on Google Books
                      </a>
                    )}
                    {selectedBook.download_link && (
                      <a
                        href={selectedBook.download_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-button"
                      >
                        <i className="fas fa-download"></i> Download Book
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="preview-description">
                <h4>About the Book</h4>
                <p>
                  {selectedBook.description || 
                    `"${selectedBook.title}" by ${selectedBook.author} is a ${selectedBook.genre} book published in ${selectedBook.publication_year}. 
                    This book is available in ${selectedBook.language} language.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Book Recommender helps you discover your next favorite book based on your preferences and reading history.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/loginP">Login</Link></li>
              <li><Link to="/signupP">Sign Up</Link></li>
              <li><Link to="/Userdash">Dashboard</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: support@bookrecommender.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Book Recommender. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
