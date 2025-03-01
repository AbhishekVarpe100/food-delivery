import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', user);
      localStorage.setItem('token', `bearer ${res.data.token}`);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.message === 'login successful') {
        setSuccess('Login successful');
        setTimeout(() => {
          setSuccess('');
          setTimeout(() => {
            navigate('/main_home');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }, 1000);
        }, 4000);
      } else if (res.data === 'admin') {
        setSuccess('Login successful');
        setTimeout(() => {
          setSuccess('');
          setTimeout(() => {
            navigate('/admin');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }, 500);
        }, 4000);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://cdn.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Background Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text contrast
          zIndex: 0,
        }}
      ></div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Login</h2>

        {/* Success Alert with Smooth Animation */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
            >
              <Alert variant='filled' severity="success">{success}</Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <TextField
          required
          name="username"
          onChange={handleChange}
          label="Username"
          variant="standard"
          fullWidth
        />

        <TextField
          type="password"
          required
          name="password"
          onChange={handleChange}
          label="Password"
          variant="standard"
          fullWidth
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          style={{ backgroundColor: '#3b82f6', hover: { backgroundColor: '#2563eb' } }}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
