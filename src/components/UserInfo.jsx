import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await userAPI.getUserById(id);
      setUser(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading user information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
        <button onClick={handleBack} className="btn-secondary">
          Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <p className="no-data">User not found</p>
        <button onClick={handleBack} className="btn-secondary">
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{user.name}</h2>
      
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

      <button onClick={handleBack} className="btn-secondary" style={{ marginTop: '1.5rem' }}>
        Back to Users
      </button>
    </div>
  );
}
