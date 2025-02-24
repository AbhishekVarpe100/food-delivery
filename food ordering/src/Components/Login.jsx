import React, { useState } from 'react';
import './CSS/Animation.css';
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
    <div className="flex items-center justify-center min-h-screen bg-slate-200 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gray-100 flex justify-center items-center">
        <div className="ball bg-red-500"></div>
        <div className="ball bg-blue-500"></div>
        <div className="ball bg-green-500"></div>
        <div className="ball bg-yellow-500"></div>
        <div className="ball bg-purple-500"></div>
      </div>

      {/* Login Form */}
      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 w-full max-w-sm p-8 bg-white rounded-lg shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

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
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
