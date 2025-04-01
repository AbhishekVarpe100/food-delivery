import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import food1 from './food1.jpg';
import food2 from './food2.jpg';
import food3 from './food3.jpg';
import food4 from './food4.jpg';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const images = [food1, food2, food3, food4]; // Array of images
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
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToLogin = () => {
    navigate('/login');
  };
  
  const goToRegister = () => {
    navigate('/register');
  };
  
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Carousel with overlay */}
      <Box sx={{ position: 'relative', height: '100vh' }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }
            }}
          />
        ))}
        
        {/* Carousel controls - hide on very small screens */}
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: 0, 
          right: 0, 
          display: { xs: 'none', sm: 'flex' }, 
          justifyContent: 'space-between', 
          px: { xs: 1, sm: 2 }, 
          zIndex: 2,
          transform: 'translateY(-50%)'
        }}>
          <IconButton 
            onClick={handlePrevImage} 
            size={isMobile ? "small" : "medium"}
            sx={{ 
              color: 'white', 
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.5)',
              }
            }}
          >
            <ArrowBackIosIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
          <IconButton 
            onClick={handleNextImage} 
            size={isMobile ? "small" : "medium"}
            sx={{ 
              color: 'white', 
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.5)',
              }
            }}
          >
            <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
        
        {/* Carousel indicators - make them more touch-friendly on mobile */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: { xs: '100px', sm: '70px' }, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          justifyContent: 'center', 
          gap: { xs: 2, sm: 1 },
          zIndex: 2 
        }}>
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                width: { xs: 16, sm: 12 },
                height: { xs: 16, sm: 12 },
                borderRadius: '50%',
                bgcolor: index === currentImageIndex ? 'primary.main' : 'white',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </Box>
        
        {/* Content overlay - adjust spacing and typography for mobile */}
        <Container maxWidth="lg" sx={{ 
          position: 'relative', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          textAlign: 'center',
          px: { xs: 2, sm: 3 }
        }}>
          <Typography 
            variant={isMobile ? "h4" : isTablet ? "h3" : "h2"} 
            component="h1" 
            color="white" 
            fontWeight="bold"
            sx={{ 
              mb: { xs: 2, sm: 3 },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' }
            }}
          >
            Welcome to Food Haven
          </Typography>
          
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="white" 
            sx={{ 
              mb: { xs: 4, sm: 6 }, 
              maxWidth: '700px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
              px: { xs: 1, sm: 0 }
            }}
          >
            Discover delicious recipes, connect with food lovers, and explore the culinary world with our community
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, sm: 2 }, 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
            px: { xs: 3, sm: 0 }
          }}>
            <Button 
              variant="contained" 
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              onClick={goToLogin}
              sx={{ 
                px: { xs: 2, sm: 4 }, 
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 'bold',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 5
                }
              }}
            >
              Sign In
            </Button>
            <Button 
              variant="outlined" 
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              onClick={goToRegister}
              sx={{ 
                px: { xs: 2, sm: 4 }, 
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 'bold',
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  borderColor: 'white'
                }
              }}
            >
              Register
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Features section - stack vertically on mobile */}
      <Box 
        sx={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          bottom: 0, 
          bgcolor: 'rgba(255,255,255,0.9)',
          py: { xs: 1, sm: 2 },
          zIndex: 3
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
          <Grid container spacing={{ xs: 1, sm: 3 }} justifyContent="center">
            <Grid item xs={4} sm={4}>
              <Card elevation={0} sx={{ bgcolor: 'transparent', height: '100%' }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column', 
                  textAlign: 'center',
                  p: { xs: 1, sm: 2 },
                  '&:last-child': { pb: { xs: 1, sm: 2 } }
                }}>
                  <RestaurantIcon color="primary" sx={{ fontSize: { xs: 24, sm: 36 }, mb: { xs: 0.5, sm: 1 } }} />
                  <Typography 
                    variant={isMobile ? "body2" : "h6"} 
                    component="h3" 
                    fontWeight="medium"
                    sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.25rem' } }}
                  >
                    Discover Recipes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Card elevation={0} sx={{ bgcolor: 'transparent', height: '100%' }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column', 
                  textAlign: 'center',
                  p: { xs: 1, sm: 2 },
                  '&:last-child': { pb: { xs: 1, sm: 2 } }
                }}>
                  <LocalDiningIcon color="primary" sx={{ fontSize: { xs: 24, sm: 36 }, mb: { xs: 0.5, sm: 1 } }} />
                  <Typography 
                    variant={isMobile ? "body2" : "h6"} 
                    component="h3" 
                    fontWeight="medium"
                    sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.25rem' } }}
                  >
                    Share Creations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Card elevation={0} sx={{ bgcolor: 'transparent', height: '100%' }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column', 
                  textAlign: 'center',
                  p: { xs: 1, sm: 2 },
                  '&:last-child': { pb: { xs: 1, sm: 2 } }
                }}>
                  <EmojiFoodBeverageIcon color="primary" sx={{ fontSize: { xs: 24, sm: 36 }, mb: { xs: 0.5, sm: 1 } }} />
                  <Typography 
                    variant={isMobile ? "body2" : "h6"} 
                    component="h3" 
                    fontWeight="medium"
                    sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.25rem' } }}
                  >
                    Join Community
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
