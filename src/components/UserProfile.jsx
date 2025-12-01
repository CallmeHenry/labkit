import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('Please sign in to view your profile');
        setLoading(false);
        return;
      }
      
      const data = await userAPI.getUserById(userId);
      setUser(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <p className="no-data">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>My Profile</h2>
      
      <div className="user-info-detail">
        <div className="user-avatar-large">
          <span>👤</span>
        </div>
        
        <table className="user-info-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            {user.position && (
              <tr>
                <th>Position</th>
                <td>{user.position}</td>
              </tr>
            )}
            {user.department && (
              <tr>
                <th>Department</th>
                <td>{user.department}</td>
              </tr>
            )}
            {user.phone && (
              <tr>
                <th>Phone</th>
                <td>{user.phone}</td>
              </tr>
            )}
            <tr>
              <th>Member Since</th>
              <td>{new Date(user.created).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={handleEditProfile} className="btn-primary" style={{ marginTop: '1.5rem' }}>
        Edit Profile
      </button>
    </div>
  );
}
