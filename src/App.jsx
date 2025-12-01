import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddDevice from './components/AddDevice';
import ListDevices from './components/ListDevices';
import EditDevice from './components/EditDevice';
import SearchDevice from './components/SearchDevice';
import ListUsers from './components/ListUsers';
import UserInfo from './components/UserInfo';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    alert('You have been signed out');
    navigate('/');
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>ComputerLab</h1>
          </div>
          <ul className="nav-items">
            <li>
              <Link to="/">Home</Link>
            </li>
            
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            ) : (
              <>
                <li className="dropdown">
                  <span className="dropdown-toggle">Devices</span>
                  <ul className="dropdown-menu">
                    <li><Link to="/devices/add">Add Device</Link></li>
                    <li><Link to="/devices/list">List Devices</Link></li>
                    <li><Link to="/devices/search">Search Device</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li className="user-info">
                  <span>👤 {userName}</span>
                </li>
                <li>
                  <button onClick={handleSignOut} className="signout-btn">
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/devices/add" element={<AddDevice />} />
          <Route path="/devices/list" element={<ListDevices />} />
          <Route path="/devices/edit/:id" element={<EditDevice />} />
          <Route path="/devices/search" element={<SearchDevice />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/:id" element={<UserInfo />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
