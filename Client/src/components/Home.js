import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import Modal from './Modal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);

  const openModal = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServices(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Home">
      <nav className="navbar">
        <div className="logo">Twin Cities</div>
        <ul className="nav-links">
          <li>About</li>
          <li>Services</li>
          <li>Projects</li>
          <li>Blog</li>
          <li>Career</li>
          <li>Contact</li>
        </ul>
      </nav>

      <header className="header-content">
        <div className="header-text">
          <h1 className="heading">Best Exterior Cleaning</h1>
          <p className="paragraph">Award Winning Exterior Cleaning Services Across Minneapolis.</p>
        </div>
        <button className="instant-quote-btn" onClick={openModal}>
          <FaThumbsUp className="icon" /> Instant Quote
        </button>
      </header>

      <Modal isOpen={isModalOpen} onClose={closeModal} services={services} />
    </div>
  );
};

export default Home;
