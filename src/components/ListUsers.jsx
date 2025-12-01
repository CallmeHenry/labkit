import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userAPI.getAllUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading users...</p>
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

  return (
    <div className="container">
      <h2>All Users</h2>
      
      <div className="user-list">
        {users.map((user) => (
          <div 
            key={user._id} 
            className="user-item"
            onClick={() => handleUserClick(user._id)}
          >
            <div className="user-avatar">
              <span>👤</span>
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              {user.email && <p className="user-email">{user.email}</p>}
            </div>
            <div className="user-arrow">
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="no-data">No users found</p>
      )}
    </div>
  );
}
