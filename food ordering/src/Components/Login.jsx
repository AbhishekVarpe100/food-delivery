import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Container, 
  Box, 
  Snackbar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/login', user);

      // Store user details in localStorage
      localStorage.setItem('token', `bearer ${res.data.token}`);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.message === 'login successful') {
        setSuccess('Login successful');
        setTimeout(() => {
          navigate('/main_home');
          window.location.reload();
        }, 2000);
      } else if (res.data.message === 'admin') {
        setSuccess('Admin login successful');
        setTimeout(() => {
          navigate('/admin');
          window.location.reload();
        }, 2000);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://cdn.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Card elevation={8} sx={{ borderRadius: 2 }}>
          <CardHeader 
            title="Sign In" 
            titleTypographyProps={{ 
              variant: "h5", 
              align: "center", 
              fontWeight: "bold",
              color: "primary.main"
            }}
            sx={{ 
              bgcolor: 'grey.100', 
              pb: 1, 
              pt: 3 
            }}
          />
          
          <CardContent sx={{ p: 4 }}>
            {success && (
              <MuiAlert 
                severity="success" 
                variant="filled" 
                sx={{ mb: 3 }}
              >
                {success}
              </MuiAlert>
            )}
            
            {error && (
              <MuiAlert 
                severity="error" 
                variant="filled" 
                sx={{ mb: 3 }}
              >
                {error}
              </MuiAlert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                variant="outlined"
                value={user.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                variant="outlined"
                value={user.password}
                onChange={handleChange}
                disabled={user.username === 'admin'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 4 }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  mt: 1, 
                  mb: 2, 
                  py: 1.5,
                  fontSize: '1rem',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                Sign In
              </Button>
              
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Typography onClick={()=>navigate('/register')}
                    component="span" 
                    variant="body2" 
                    color="primary" 
                    sx={{ 
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Register here
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;