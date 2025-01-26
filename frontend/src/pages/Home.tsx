import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return username ? (
    <div>
      <h1>Welcome {username || "User"}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;
