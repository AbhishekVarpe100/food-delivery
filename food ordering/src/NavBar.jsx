import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Analog Clock Component with classic styling
const ClassicAnalogClock = ({ size = 32 }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotation angles
  const hourRotation = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + slight adjustment for minutes
  const minuteRotation = minutes * 6; // 6 degrees per minute
  const secondRotation = seconds * 6; // 6 degrees per second

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#f8f8f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 4px rgba(0,0,0,0.2), inset 0 0 5px rgba(0,0,0,0.1)',
        border: '2px solid #d4d4bc',
        mr: 1.5
      }}
    >
      {/* Clock Face with hour markers */}
      <Box
        sx={{
          position: 'absolute',
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          backgroundColor: '#f8f8f0',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: '#333',
            borderRadius: '50%',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: '#333',
            borderRadius: '50%',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)'
          }
        }}
      />
      
      {/* Additional hour markers */}
      <Box sx={{ 
        position: 'absolute', 
        width: '4px', 
        height: '4px', 
        backgroundColor: '#333', 
        borderRadius: '50%',
        left: '10%',
        top: '50%',
        transform: 'translateY(-50%)'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        width: '4px', 
        height: '4px', 
        backgroundColor: '#333', 
        borderRadius: '50%',
        right: '10%',
        top: '50%',
        transform: 'translateY(-50%)'
      }} />
      
      {/* Hour Hand */}
      <Box
        sx={{
          position: 'absolute',
          height: `${size * 0.18}px`,
          width: '3px',
          backgroundColor: '#333',
          borderRadius: '1.5px',
          bottom: '50%',
          transformOrigin: 'bottom',
          transform: `rotate(${hourRotation}deg)`,
          zIndex: 2
        }}
      />
      
      {/* Minute Hand */}
      <Box
        sx={{
          position: 'absolute',
          height: `${size * 0.28}px`,
          width: '2px',
          backgroundColor: '#555',
          borderRadius: '1px',
          bottom: '50%',
          transformOrigin: 'bottom',
          transform: `rotate(${minuteRotation}deg)`,
          zIndex: 3
        }}
      />
      
      {/* Second Hand */}
      <Box
        sx={{
          position: 'absolute',
          height: `${size * 0.32}px`,
          width: '1px',
          backgroundColor: '#990000',
          borderRadius: '0.5px',
          bottom: '50%',
          transformOrigin: 'bottom',
          transform: `rotate(${secondRotation}deg)`,
          zIndex: 4
        }}
      />
      
      {/* Center Dot */}
      <Box
        sx={{
          position: 'absolute',
          height: '5px',
          width: '5px',
          backgroundColor: '#333',
          border: '1px solid #990000',
          borderRadius: '50%',
          zIndex: 5
        }}
      />
    </Box>
  );
};

function NavBar() {
  const [username, setUser] = useState(localStorage.getItem("username"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCountTotal, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setTimeout(() => {
      navigate("/login");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1000);
  };

  const getCartCount = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/get-cart-count?username=${username}`,
        { method: "GET" }
      );
      if (res.ok) {
        let data = await res.json();
        setCount(data.cart_count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartCount();
    
    // Set up the clock timer
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsMenuOpen(open);
  };
  
  // Format current time in 12-hour format with AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#2d3033', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        {/* Top decorative border */}
        <Box sx={{ height: '4px', bgcolor: '#990000', width: '100%' }} />
        
        <Toolbar sx={{ height: '68px' }}>
          {/* Logo */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.5px',
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            Fine<span style={{ color: '#c2a878' }}>Dining</span>Platform
          </Typography>
          
          {/* Clock Display for Desktop */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.07)',
            padding: '4px 14px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.1)',
            marginRight: 3
          }}>
            <ClassicAnalogClock size={32} />
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Georgia, serif', 
                fontWeight: 'normal',
                fontSize: '0.9rem',
                color: '#e1e1e1'
              }}
            >
              {formatTime(currentTime)}
            </Typography>
          </Box>

          {/* Hamburger Menu for Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ 
              display: { md: 'none' },
              color: '#c2a878'
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              startIcon={<HomeIcon />}
              sx={{ 
                mr: 2.5,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontFamily: 'Georgia, serif',
                borderRadius: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(194, 168, 120, 0.1)'
                }
              }}
            >
              Home
            </Button>

            {username ? (
              <>
                <Button 
                  color="inherit" 
                  onClick={handleLogOut} 
                  startIcon={<ExitToAppIcon />} 
                  sx={{ 
                    mr: 2.5,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontFamily: 'Georgia, serif',
                    borderRadius: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(194, 168, 120, 0.1)'
                    }
                  }}
                >
                  Log out
                </Button>
                {localStorage.getItem('username')=='undefined'?null:
                <IconButton 
                  color="inherit" 
                  component={Link} 
                  to="/cart" 
                  sx={{ 
                    mr: 2.5,
                    color: '#e1e1e1',
                    '&:hover': {
                      color: '#c2a878'
                    }
                  }}
                >
                  <Badge 
                    badgeContent={cartCountTotal} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#990000',
                        color: 'white'
                      }
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>}
                <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <AccountCircleIcon sx={{ mr: 1, color: '#c2a878' }} />
                  <div>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontFamily: 'Georgia, serif',
                        color: '#e1e1e1'
                      }}
                    >
                      {username=='undefined'?null:username}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.7)'
                      }}
                    >
                      {localStorage.getItem("email")=='undefined'?null:localStorage.getItem("email")}
                    </Typography>
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login" 
                  startIcon={<LoginIcon />}
                  sx={{ 
                    mr: 2.5,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontFamily: 'Georgia, serif',
                    borderRadius: '2px',
                    '&:hover': {
                      backgroundColor: 'rgba(194, 168, 120, 0.1)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/register"
                  startIcon={<PersonAddIcon />}
                  sx={{ 
                    borderColor: '#c2a878',
                    color: '#c2a878',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontFamily: 'Georgia, serif',
                    borderRadius: '2px',
                    '&:hover': {
                      borderColor: '#d9c9a3',
                      color: '#d9c9a3',
                      backgroundColor: 'rgba(194, 168, 120, 0.05)'
                    }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
        {/* Bottom border */}
        <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.1)', width: '100%' }} />
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { 
            width: '70%', 
            backgroundColor: '#2d3033',
            color: '#e1e1e1'
          }
        }}
      >
        <Box sx={{ width: '100%', padding: 2 }} role="presentation">
          {/* Top decorative border */}
          <Box sx={{ height: '3px', bgcolor: '#990000', width: '100%', marginBottom: 2 }} />
          
          {/* Logo for drawer */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.5px',
              fontSize: '1.2rem',
              marginBottom: 2,
              textAlign: 'center'
            }}
          >
            Fine<span style={{ color: '#c2a878' }}>Dining</span>Platform
          </Typography>
          
          {/* Clock Display for Mobile */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '10px 15px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.1)',
            margin: '12px 0 20px 0'
          }}>
            <ClassicAnalogClock size={40} />
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'Georgia, serif', 
                fontWeight: 'normal',
                fontSize: '1rem',
                color: '#e1e1e1',
                ml: 1
              }}
            >
              {formatTime(currentTime)}
            </Typography>
          </Box>
          
          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', my: 1 }} />
          
          <List>
            <ListItem 
              button 
              component={Link} 
              to="/" 
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(194, 168, 120, 0.1)'
                }
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: '#c2a878' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Home" 
                primaryTypographyProps={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem'
                }}
              />
            </ListItem>
            
            {username ? (
              <>
                <ListItem 
                  button 
                  onClick={handleLogOut}
                  sx={{
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(194, 168, 120, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon sx={{ color: '#c2a878' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Log out" 
                    primaryTypographyProps={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '1rem'
                    }}
                  />
                </ListItem>
                
                <ListItem 
                  button 
                  component={Link} 
                  to="/cart" 
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(194, 168, 120, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon>
                    <Badge 
                      badgeContent={cartCountTotal} 
                      color="error"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#990000',
                          color: 'white'
                        }
                      }}
                    >
                      <ShoppingCartIcon sx={{ color: '#c2a878' }} />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary={`Cart (${cartCountTotal} ${cartCountTotal==1?'Item':'Items'})`} 
                    primaryTypographyProps={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '1rem'
                    }}
                  />
                </ListItem>
                
                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', my: 1.5 }} />
                
                <ListItem sx={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: '#c2a878' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={username}
                    secondary={localStorage.getItem("email")}
                    primaryTypographyProps={{ 
                      fontWeight: 'bold',
                      fontFamily: 'Georgia, serif',
                      color: '#e1e1e1'
                    }}
                    secondaryTypographyProps={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.8rem'
                    }}
                  />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem 
                  button 
                  component={Link} 
                  to="/login" 
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(194, 168, 120, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon>
                    <LoginIcon sx={{ color: '#c2a878' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Login" 
                    primaryTypographyProps={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '1rem'
                    }}
                  />
                </ListItem>
                
                <ListItem 
                  button 
                  component={Link} 
                  to="/register" 
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(194, 168, 120, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon>
                    <PersonAddIcon sx={{ color: '#c2a878' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Register" 
                    primaryTypographyProps={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '1rem'
                    }}
                  />
                </ListItem>
              </>
            )}
          </List>
          
          <IconButton 
            onClick={toggleDrawer(false)} 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8,
              color: '#c2a878',
              '&:hover': {
                backgroundColor: 'rgba(194, 168, 120, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}

export default NavBar;
