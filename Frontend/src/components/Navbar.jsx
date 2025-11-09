import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        Nature<span>Blend</span>
      </div>

      <div className="nav-links">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-register">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
