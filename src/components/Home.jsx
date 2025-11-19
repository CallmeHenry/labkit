export default function Home() {
  const userName = localStorage.getItem('userName');
  const isLoggedIn = localStorage.getItem('token');

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

        {!isLoggedIn && (
          <div className="cta-section">
            <p>Get started by creating an account or signing in</p>
          </div>
        )}
      </div>
    </div>
  );
}
