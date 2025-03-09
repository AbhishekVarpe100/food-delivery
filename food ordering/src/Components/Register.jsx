import React, { useState } from 'react';
import './CSS/Animation.css';
import axios from 'axios'; 
import Button from '@mui/material/Button';
import { Alert, TextField } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);
  const [exist, setExist] = useState('');
  const [success, setSuccess] = useState('');
  const [rateLimit, setRateLimit] = useState('');
  const [rsp, setRsp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setRsp(true);

    try {
      const res = await axios.post('http://localhost:3000/register', user);
      if (res.data.errors) {
        setErrors(Array.isArray(res.data.errors) ? res.data.errors : []);
      } else if (res.data.msg) {
        setRsp(false);
        setExist("Username or email already exists.");
        setTimeout(() => {
          setExist('');
        }, 4000);
      } else if (res.data.register) {
        setRsp(false);
        setSuccess("Registered successfully!");
        setTimeout(() => {
          setSuccess('');
          setUser({ username: '', email: '', password: '' });
        }, 4000);
      }
    } catch (error) {
      setRateLimit(<b>Too many requests! Please try again after 5 minutes.</b>);
      setTimeout(() => {
        setRateLimit('');
      }, 4000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{
          backgroundImage: `url('https://im.whatshot.in/img/2020/Apr/41215842-2062970037054645-8180165235601047552-o-baan-tao-cropped-1586780385.jpg')`,
          filter: "brightness(0.5)", // Faint effect
        }}>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-lg space-y-4">
        <strong className="text-xl font-semibold">Register</strong>

        <AnimatePresence>
          {exist && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Alert variant="filled" severity="error">{exist}</Alert>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <Alert variant="filled" severity="success">{success}</Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {rateLimit && (
          <div className="w-full p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg" role="alert">
            {rateLimit}
          </div>
        )}

        {/* Username Input */}
        <TextField 
          value={user.username} 
          required 
          name="username" 
          onChange={handleChange} 
          label="Username" 
          variant="standard"
          fullWidth
        />
        {errors.map((err, index) => 
          err.path === 'username' ? (
            <div key={index} className="text-red-500 text-sm mt-1 pl-1">
              {err.msg}
            </div>
          ) : null
        )}

        {/* Email Input */}
        <TextField 
          value={user.email}
          required 
          name="email" 
          onChange={handleChange} 
          label="Email" 
          variant="standard"
          fullWidth
        />
        {errors.map((err, index) => 
          err.path === 'email' ? (
            <div key={index} className="text-red-500 text-sm mt-1 pl-1">
              {err.msg}
            </div>
          ) : null
        )}

        {/* Password Input */}
        <TextField 
          value={user.password}
          required 
          name="password" 
          type="password"
          onChange={handleChange} 
          label="Password" 
          variant="standard"
          fullWidth
        />
        {errors.map((err, index) => 
          err.path === 'password' ? (
            <div key={index} className="text-red-500 text-sm mt-1 pl-1">
              {err.msg}
            </div>
          ) : null
        )}
  
        {/* Submit Button */}
        <Button variant="contained" fullWidth type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
