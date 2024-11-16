import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import food4 from './food4.jpg';

function Home() {
  const navigate = useNavigate();
  const images = [food1,food2,food3,food4]; // Array of images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check user details and navigate if logged in
  useEffect(() => {
    function checkUserDetails() {
      if (localStorage.getItem('username') && localStorage.getItem('email')) {
        navigate('/main_home');
      }
    }
    checkUserDetails();
  }, [navigate]);

  // Automatic carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  return (
    <div className="relative h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentImageIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
          className="absolute inset-0 h-full w-full"
        />
      ))}
      
    </div>
  );
}

export default Home;
