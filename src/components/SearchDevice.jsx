import { useState } from 'react';
import { deviceAPI } from '../services/api';

export default function SearchDevice() {
  const [deviceId, setDeviceId] = useState('');
  const [device, setDevice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setDevice(null);
    setSearched(true);

    if (!deviceId.trim()) {
      setError('Please enter a device ID');
      return;
    }

    setLoading(true);
    try {
      const data = await deviceAPI.getDeviceById(deviceId);
      setDevice(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDeviceId('');
    setDevice(null);
    setError('');
    setSearched(false);
  };

  return (
    <div className="container">
      <h2>Search Device</h2>
      <p className="subtitle">Search for a device by its ID</p>
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="Enter device ID"
              className="search-input"
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
            {searched && (
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        {device && (
          <div className="device-detail">
            <h3>Device Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <strong>ID:</strong>
                <span>{device._id}</span>
              </div>
              <div className="detail-item">
                <strong>Name:</strong>
                <span>{device.name}</span>
              </div>
              <div className="detail-item">
                <strong>Type:</strong>
                <span>{device.type}</span>
              </div>
              <div className="detail-item">
                <strong>Status:</strong>
                <span className={`status-badge status-${device.status}`}>
                  {device.status}
                </span>
              </div>
              <div className="detail-item">
                <strong>Serial Number:</strong>
                <span>{device.serialNumber || 'N/A'}</span>
              </div>
              <div className="detail-item full-width">
                <strong>Description:</strong>
                <span>{device.description || 'No description available'}</span>
              </div>
              <div className="detail-item">
                <strong>Created:</strong>
                <span>{new Date(device.created).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <strong>Last Updated:</strong>
                <span>{new Date(device.updated).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {searched && !device && !error && !loading && (
          <p className="no-results">No device found with the provided ID.</p>
        )}
      </div>
    </div>
  );
}
