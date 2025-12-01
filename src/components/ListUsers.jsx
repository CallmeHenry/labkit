import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

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

  const handleDelete = async (userId, userName, e) => {
    e.stopPropagation();
    
    if (!isAdmin) {
      alert('Only admins can delete users');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await userAPI.deleteUser(userId);
        alert('User deleted successfully');
        fetchUsers();
      } catch (error) {
        alert(error.message);
      }
    }
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
              <h3>{user.name} {user.isAdmin && <span className="admin-badge">Admin</span>}</h3>
              {user.email && <p className="user-email">{user.email}</p>}
            </div>
            <div className="user-actions">
              <button 
                className="btn-delete-small"
                onClick={(e) => handleDelete(user._id, user.name, e)}
                title={isAdmin ? 'Delete user' : 'Only admins can delete'}
              >
                Delete
              </button>
              <span className="user-arrow">→</span>
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
