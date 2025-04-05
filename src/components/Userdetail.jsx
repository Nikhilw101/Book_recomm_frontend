import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Userdetail.css';

const Userdetail = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/recommendations/user/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        toast.error('Failed to fetch user details');
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="user-detail-loading">
        <div className="spinner"></div>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!userDetails) {
    return <div className="user-detail-error">Failed to load user details</div>;
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-card">
        <h2>User Profile</h2>
        <div className="user-detail-item">
          <label>Name:</label>
          <span>{userDetails.name}</span>
        </div>
        <div className="user-detail-item">
          <label>Username:</label>
          <span>{userDetails.username}</span>
        </div>
        <div className="user-detail-item">
          <label>Email:</label>
          <span>{userDetails.email}</span>
        </div>
        <div className="user-detail-item">
          <label>Member Since:</label>
          <span>{new Date(userDetails.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Userdetail;