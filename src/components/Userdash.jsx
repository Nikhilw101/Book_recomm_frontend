import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Bookpreference from './Bookpreference';
import Bookhistory from './Bookhistory';
import BookAuto_recom from './BookAuto_recom';
import BackToHome from './BackToHome';
import Userdetail from './Userdetail';
import Assistentchat from './Assistentchat';
import '../styles/Userdash.css';

// Import Material-UI components
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  AutoAwesome as AutoAwesomeIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const Userdash = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:620px)');
  
  const [userId, setUserId] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [activeSection, setActiveSection] = useState('user-info');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (!storedUserId) {
      navigate('/LoginP');
      return;
    }
    setUserId(storedUserId);
    fetchUserName(storedUserId);
  }, [navigate]);

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  const fetchUserName = async (id) => {
    try {
      const response = await axios.get(`https://book-recomm-backend.onrender.com/api/users/${id}`);
      setUserName(response.data.name || 'User');
    } catch (error) {
      console.error('Error fetching user name:', error);
      setUserName('User');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  const handlePreferencesSaved = (newRecommendations) => {
    setRecommendations(newRecommendations);
    setActiveSection('recommendations');
    toast.success('Recommendations updated! Check the Recommended Books section.');
  };

  const handlePreviewClick = (book) => {
    setSelectedBook(book);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedBook(null);
  };

  const handleAssistantClick = (book) => {
    setSelectedBook(book);
    setShowAssistant(true);
  };

  const handleCloseAssistant = () => {
    setShowAssistant(false);
    setSelectedBook(null);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  const menuItems = [
    { id: 'user-info', label: 'User Info', icon: <PersonIcon /> },
    { id: 'search-books', label: 'Search Books', icon: <SearchIcon /> },
    { id: 'recommendations', label: 'Recommended Books', icon: <AutoAwesomeIcon /> },
    { id: 'book-history', label: 'Book History', icon: <HistoryIcon /> },
    { id: 'auto-recommend', label: 'Auto Recommendations', icon: <AutoAwesomeIcon /> },
  ];

  if (!userId) {
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'user-info':
        return <Userdetail userId={userId} />;
      case 'search-books':
        return <Bookpreference userId={userId} onPreferencesSaved={handlePreferencesSaved} />;
      case 'recommendations':
        return recommendations.length > 0 ? (
          <div className="recommendations-section">
            <h2>Recommended Books</h2>
            <div className="recommendations-grid">
              {recommendations.map((book, index) => (
                <div key={index} className="recommendation-card">
                  <div className="book-thumbnail">
                    <img
                      src={book.thumbnail || `https://via.placeholder.com/150x200?text=${encodeURIComponent(book.title.substring(0, 20))}`}
                      alt={book.title}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150x200?text=${encodeURIComponent(book.title.substring(0, 20))}`;
                      }}
                    />
                  </div>
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="author">{book.author}</p>
                    <p className="genre">{book.genre || 'Genre not specified'}</p>
                    <p className="year">Published: {book.publication_year}</p>
                    <p className="language">Language: {book.language}</p>
                    <div className="book-actions">
                      <button
                        className="preview-button"
                        onClick={() => handlePreviewClick(book)}
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
          </div>
        ) : (
          <div className="no-recommendations">
            <h3>No Recommendations Yet</h3>
            <p>Search for books to get personalized recommendations!</p>
          </div>
        );
      case 'book-history':
        return <Bookhistory userId={userId} onPreviewBook={handlePreviewClick} />;
      case 'auto-recommend':
        return <BookAuto_recom userId={userId} onPreviewBook={handlePreviewClick} />;
      default:
        return <Userdetail userId={userId} />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <AppBar position="fixed" className="dashboard-header" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="menu-button"
            size="large"
            sx={{ mr: 2, zIndex: 1301 }}
          >
            <MenuIcon />
          </IconButton>
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           
            <IconButton color="inherit" onClick={() => navigate('/')} size="small">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout} size="small">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Vertical Navigation Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="dashboard-drawer"
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          '& .MuiDrawer-paper': {
            marginTop: '64px',
            height: 'calc(100% - 64px)',
            zIndex: 1200
          }
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (isMobile) {
                    setDrawerOpen(false);
                  }
                }}
                className={activeSection === item.id ? 'active-menu-item' : ''}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box className={`dashboard-content ${!isMobile && drawerOpen ? 'content-with-drawer' : ''}`}>
        <Toolbar />
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </Box>

      {/* Preview Modal */}
      {showPreview && selectedBook && (
        <div className="preview-modal-overlay">
          <div className="preview-modal">
            <div className="preview-modal-header">
              <h3>{selectedBook.title}</h3>
              <button className="close-button" onClick={handleClosePreview}>×</button>
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
                      <button
                        onClick={() => handleExternalLink(selectedBook.preview_link)}
                        className="preview-button"
                      >
                        View on Google Books
                      </button>
                    )}
                    {selectedBook.download_link && (
                      <button
                        onClick={() => handleExternalLink(selectedBook.download_link)}
                        className="download-button"
                      >
                        Download Book
                      </button>
                    )}
                    <button
                      className="assistant-button"
                      onClick={() => handleAssistantClick(selectedBook)}
                    >
                      Book Assistant
                    </button>
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

      {/* Assistant Chat */}
      {showAssistant && selectedBook && (
        <Assistentchat
          book={selectedBook}
          onClose={handleCloseAssistant}
        />
      )}
    </div>
  );
};

export default Userdash;