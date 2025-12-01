import { useState, useEffect } from 'react';
import { deviceAPI } from '../services/api';

export default function Home() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName');
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const data = await deviceAPI.getAllDevices();
      setDevices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="home-content">
        <h1>Device Inventory Management System</h1>
        
        {isLoggedIn ? (
          <div className="welcome-section">
            <h2>Welcome {userName}!</h2>
            <p>Manage your organization's device inventory efficiently.</p>
          </div>
        ) : (
          <div className="welcome-section">
            <h2>Welcome to ComputerLab</h2>
            <p>Please sign in to access device management features.</p>
          </div>
        )}

        <div className="features-grid">
          <div className="feature-card">
            <h3>📱 Device Management</h3>
            <p>Add, edit, and delete devices from your inventory with ease.</p>
          </div>
          
          <div className="feature-card">
            <h3>🔍 Quick Search</h3>
            <p>Find devices instantly by searching with their unique ID.</p>
          </div>
          
          <div className="feature-card">
            <h3>📊 Track Status</h3>
            <p>Monitor device status: Available, In-Use, or under Maintenance.</p>
          </div>
          
          <div className="feature-card">
            <h3>🔐 Secure Access</h3>
            <p>Authenticated access to ensure data security and integrity.</p>
          </div>
        </div>

        {!loading && devices.length > 0 && (
          <div className="devices-preview">
            <h2>Available Devices</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Device ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.slice(0, 5).map((device) => (
                    <tr key={device._id}>
                      <td>{device.deviceId}</td>
                      <td>{device.name}</td>
                      <td>{device.type}</td>
                      <td>
                        <span className={`status-badge status-${device.status.toLowerCase().replace(' ', '-')}`}>
                          {device.status}
                        </span>
                      </td>
                      <td>{device.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {devices.length > 5 && (
              <p style={{ textAlign: 'center', marginTop: '1rem', color: '#7f8c8d' }}>
                Showing 5 of {devices.length} devices
              </p>
            )}
          </div>
        )}

        {!isLoggedIn && (
          <div className="cta-section">
            <p>Get started by creating an account or signing in</p>
          </div>
        )}
      </div>
    </div>
  );
}
