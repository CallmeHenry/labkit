import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deviceAPI } from '../services/api';

export default function AddDevice() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'available',
    serialNumber: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to add a device');
      return;
    }

    setLoading(true);
    try {
      await deviceAPI.createDevice(formData);
      alert('Device added successfully!');
      navigate('/devices/list');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add New Device</h2>
        <p className="subtitle">Add a device to the inventory</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Device Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Dell Laptop XPS 15"
            />
          </div>

          <div className="form-group">
            <label>Type *</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              placeholder="e.g., Laptop, Desktop, Monitor"
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              placeholder="e.g., SN123456789"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Additional details about the device"
            />
          </div>

          {error && <p className="error">{error}</p>}
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Adding Device...' : 'Add Device'}
          </button>
        </form>
      </div>
    </div>
  );
}
