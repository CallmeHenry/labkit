import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deviceAPI } from '../services/api';

export default function ListDevices() {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const data = await deviceAPI.getAllDevices();
      setDevices(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isLoggedIn) {
      alert('You must be logged in to delete devices');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this device?')) {
      return;
    }

    try {
      await deviceAPI.deleteDevice(id);
      alert('Device deleted successfully!');
      fetchDevices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (id) => {
    if (!isLoggedIn) {
      alert('You must be logged in to edit devices');
      return;
    }
    navigate(`/devices/edit/${id}`);
  };

  if (loading) {
    return <div className="container"><p>Loading devices...</p></div>;
  }

  return (
    <div className="container">
      <h2>Device Inventory</h2>
      <p className="subtitle">View all devices in the system</p>
      
      {error && <p className="error">{error}</p>}
      
      {devices.length === 0 ? (
        <p>No devices found. Add your first device!</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Serial Number</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device._id}>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>
                    <span className={`status-badge status-${device.status}`}>
                      {device.status}
                    </span>
                  </td>
                  <td>{device.serialNumber || 'N/A'}</td>
                  <td className="description-cell">{device.description || 'No description'}</td>
                  <td>
                    {isLoggedIn ? (
                      <div className="action-buttons">
                        <button 
                          onClick={() => handleEdit(device._id)}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(device._id)}
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span>View Only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
