import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Material UI imports
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Container, 
  Box, 
  Divider, 
  Paper,
  CircularProgress
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RateReviewIcon from '@mui/icons-material/RateReview';

function Item() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [status, setStatus] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/get-item", {
        params: { id },
      });
      setData([res.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching item:", error);
      setLoading(false);
    }
  };

  const handleCart = async (id) => {
    try {
      const res = await axios.post("http://localhost:3000/add-to-cart", {
        id,
        username: localStorage.getItem("username"),
      });
      if (res) {
        setRender((prev) => !prev);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await axios.post("http://localhost:3000/add-fav", {
        ...data[0],
        username: localStorage.getItem('username')
      });
      if (res.data) {
        setRender(prev => !prev);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  async function getStatus() {
    try {
      const res = await axios.get('http://localhost:3000/get-status', {
        params: { username: localStorage.getItem('username') }
      });
      setStatus(res.data);
    } catch (error) {
      console.error("Error getting status:", error);
    }
  }

  useEffect(() => {
    getData();
    getStatus();
  }, [render]);

  // Classic theme colors
  const classicTheme = {
    primary: "#8B4513", // Saddle Brown
    secondary: "#DEB887", // Burlywood
    accent: "#A0522D", // Sienna
    background: "#F5F5DC", // Beige
    cardBg: "#FFFAF0", // Floral White
    textPrimary: "#2F4F4F", // Dark Slate Gray
    textSecondary: "#696969" // Dim Gray
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        backgroundColor: classicTheme.background
      }}>
        <CircularProgress sx={{ color: classicTheme.primary }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      py: 6, 
      px: 2, 
      backgroundColor: classicTheme.background, 
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center',
          backgroundColor: 'transparent',
          border: 'none'
        }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontFamily: 'Garamond, serif', 
              color: classicTheme.primary,
              fontWeight: 'bold'
            }}
          >
            Item Details
          </Typography>
          <Divider sx={{ 
            width: '200px', 
            margin: '0 auto',
            borderColor: classicTheme.secondary,
            borderWidth: 2,
            mb: 4
          }} />
        </Paper>

        <Grid container spacing={4} justifyContent="center">
          {data.map((ele) => (
            <Grid item key={ele._id} xs={12} md={10} lg={8}>
              <Card 
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  backgroundColor: classicTheme.cardBg,
                  border: `1px solid ${classicTheme.secondary}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: '100%', md: '40%' },
                    height: { xs: 240, md: 'auto' },
                    objectFit: 'cover'
                  }}
                  image={`http://localhost:3000/Food_Images/${ele.file}`}
                  alt={ele.name}
                />
                
                <CardContent sx={{ 
                  p: 4, 
                  flex: '1 1 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontFamily: 'Garamond, serif',
                        color: classicTheme.textPrimary,
                        fontWeight: 'medium',
                        borderBottom: `2px solid ${classicTheme.secondary}`,
                        pb: 1,
                        mb: 3
                      }}
                    >
                      {ele.name}
                    </Typography>
                    
                    <Box sx={{ mb: 4, pl: 2, borderLeft: `3px solid ${classicTheme.secondary}` }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: 'Garamond, serif',
                          color: classicTheme.textPrimary,
                          mb: 1
                        }}
                      >
                        <strong>Price:</strong> {ele.price} Rs.
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: 'Garamond, serif',
                          color: classicTheme.textPrimary
                        }}
                      >
                        <strong>Quantity:</strong> {ele.quantity} Items
                      </Typography>
                    </Box>

                    {ele.quantity <= 5 && (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#B22222', 
                          fontStyle: 'italic',
                          mb: 3,
                          fontWeight: 'medium',
                          fontSize: '0.9rem'
                        }}
                      >
                        Hurry up! Limited quantity left.
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2,
                    mt: 2
                  }}>
                    <Button
                      component={Link}
                      to={`/main_home/order/${ele._id}`}
                      variant="contained"
                      startIcon={<RestaurantMenuIcon />}
                      sx={{
                        backgroundColor: classicTheme.primary,
                        color: 'white',
                        fontFamily: 'Garamond, serif',
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: classicTheme.accent
                        },
                        py: 1.5
                      }}
                    >
                      Order Now
                    </Button>

                    {ele.cart_status === "added" ? (
                      <Box 
                        sx={{ 
                          p: 2, 
                          backgroundColor: '#F0FFF0', 
                          color: '#2E8B57',
                          fontWeight: 'medium',
                          border: '1px solid #98FB98',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1
                        }}
                      >
                        <ShoppingCartIcon />
                        <Typography>Item added to cart</Typography>
                      </Box>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handleCart(ele._id)}
                          sx={{
                            borderColor: classicTheme.primary,
                            color: classicTheme.primary,
                            fontFamily: 'Garamond, serif',
                            fontSize: '1rem',
                            '&:hover': {
                              borderColor: classicTheme.accent,
                              backgroundColor: '#FFF8DC',
                              color: classicTheme.accent
                            },
                            py: 1.5
                          }}
                        >
                          Add to Cart
                        </Button>

                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          mt: 1
                        }}>
                          <Button
                            component={Link}
                            to={`/main_home/reviews/${ele._id}`}
                            variant="text"
                            startIcon={<RateReviewIcon />}
                            sx={{
                              color: classicTheme.accent,
                              fontFamily: 'Garamond, serif',
                              '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            View Reviews
                          </Button>

                          {Array.isArray(status) && status.includes(ele.name) ? (
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              color: '#2E8B57',
                              gap: 1
                            }}>
                              <FavoriteIcon color="error" />
                              <Typography sx={{ fontFamily: 'Garamond, serif' }}>
                                Added to Favorite
                              </Typography>
                            </Box>
                          ) : (
                            <Button
                              onClick={handleFavorite}
                              variant="text"
                              startIcon={<FavoriteBorderIcon />}
                              sx={{
                                color: classicTheme.accent,
                                fontFamily: 'Garamond, serif',
                                '&:hover': {
                                  backgroundColor: 'transparent',
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              Add to Favorite
                            </Button>
                          )}
                        </Box>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Item;