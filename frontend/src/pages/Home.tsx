import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';  // Ensure you create and import Home.css

const Home: React.FC = () => {
  return (
      <div>
      <div className="home__content">
        <h1>Welcome to the App!</h1>
        <p>Here you can manage your subscription and payments.</p>
        <div className="home__links">
          <Link to="/login" className="home__link">Login</Link> | <Link to="/signup" className="home__link">Signup</Link>
        </div>
      </div>
        <span className="home__background__shape home__background__shape1"></span>
        <span className="home__background__shape home__background__shape3"></span>
      </div>
  );
};

export default Home;
