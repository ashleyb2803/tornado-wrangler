import { NavLink, Link } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  
  function handleLogOut() {
    logOut();
    setUser(null);
      
    // The <Link> that was clicked will navigate to "/"
  }

  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/posts" end>
            Post List
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/posts/new">New Post</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/weather-alerts">Weather Alerts</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/tornado-events">Tornado Events</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/locations">Locations</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/user-reports">User Reports</NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>Log Out</Link>
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}