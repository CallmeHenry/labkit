import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deviceAPI } from '../services/api';

export default function EditDevice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'available',
    serialNumber: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to edit devices');
      navigate('/signin');
      return;
    }
    
    fetchDevice();
  }, [id]);

  const fetchDevice = async () => {
    try {
      const data = await deviceAPI.getDeviceById(id);
      setFormData({
        name: data.name,
        type: data.type,
        status: data.status,
        serialNumber: data.serialNumber || '',
        description: data.description || ''
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    setSubmitting(true);

    try {
      await deviceAPI.updateDevice(id, formData);
      alert('Device updated successfully!');
      navigate('/devices/list');
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container"><p>Loading device...</p></div>;
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2>Edit Device</h2>
        <p className="subtitle">Update device information</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Device Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {error && <p className="error">{error}</p>}
          
          <div className="button-group">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Device'}
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/devices/list')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
