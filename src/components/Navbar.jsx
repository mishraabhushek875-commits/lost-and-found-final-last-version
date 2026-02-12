import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="logosec">
        <img src="/lost-and-foundlogo.png" alt="" className='logoHome' />
        <h1>Back2u</h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/report">Report Item</Link></li>   {/* Fixed path */}
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbtns">
        <button className='login' onClick={() => navigate("/login")}>Log In</button>
        <button className='login' onClick={() => navigate("/admin/login")}>Admin Login</button>
        <button className='login' onClick={() => navigate("/signup")}>Sign Up</button>
        
      </div>
    </div>
  );
}

export default Navbar;
