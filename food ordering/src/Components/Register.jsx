import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Stack,
  Divider,
  InputAdornment,
  IconButton
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [exist, setExist] = useState("");
  const [success, setSuccess] = useState("");
  const [rateLimit, setRateLimit] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate()

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
    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:3000/register", user);
      if (res.data.errors) {
        setErrors(Array.isArray(res.data.errors) ? res.data.errors : []);
      } else if (res.data.msg) {
        setIsSubmitting(false);
        setExist("Username or email already exists.");
        setTimeout(() => setExist(""), 4000);
      } else if (res.data.register) {
        setIsSubmitting(false);
        setSuccess("Registered successfully!");
        setTimeout(() => {
          setSuccess("");
          setUser({ username: "", email: "", password: "" });
        }, 4000);
      }
    } catch (error) {
      setRateLimit("Too many requests! Please try again after 5 minutes.");
      setTimeout(() => setRateLimit(""), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = (fieldName) => {
    const fieldError = errors.find((err) => err.path === fieldName);
    return fieldError ? fieldError.msg : null;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('https://im.whatshot.in/img/2020/Apr/41215842-2062970037054645-8180165235601047552-o-baan-tao-cropped-1586780385.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
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
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Card elevation={8} sx={{ borderRadius: 2 }}>
          <CardHeader 
            title="Create Account" 
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
            <Stack spacing={2} sx={{ mb: 3 }}>
              {exist && (
                <Alert severity="error" variant="filled">
                  {exist}
                </Alert>
              )}

              {success && (
                <Alert severity="success" variant="filled">
                  {success}
                </Alert>
              )}

              {rateLimit && (
                <Alert severity="error" variant="filled">
                  {rateLimit}
                </Alert>
              )}
            </Stack>

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
                error={Boolean(getErrorMessage("username"))}
                helperText={getErrorMessage("username")}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                variant="outlined"
                value={user.email}
                onChange={handleChange}
                error={Boolean(getErrorMessage("email"))}
                helperText={getErrorMessage("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
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
                autoComplete="new-password"
                variant="outlined"
                value={user.password}
                onChange={handleChange}
                error={Boolean(getErrorMessage("password"))}
                helperText={getErrorMessage("password")}
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
                disabled={isSubmitting}
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
                {isSubmitting ? "Creating Account..." : "Register"}
              </Button>
              
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Typography onClick={()=>navigate('/login')}
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
                    Sign in here
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

export default Register;