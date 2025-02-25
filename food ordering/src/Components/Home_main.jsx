import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Container,
  Alert
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import InventoryIcon from "@mui/icons-material/Inventory";

const Home_main = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isValid, setIsValid] = useState(true);
  const [isTokenPresent, setIsTokenPresent] = useState(true);
  const [authData, setAuthData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const checkUserValid = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gethome", {
        params: { token },
      });
      if (res.data.msg === "token not present") {
        setIsTokenPresent(false);
      } else if (res.data.msg === "invalid token") {
        setIsValid(false);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
      } else if (res.data.msg === "profile accessed") {
        setIsValid(true);
        setAuthData(res.data.authData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserValid();
  }, []);

  const navigationLinks = [
    { title: "Available Items", path: "/main_home", icon: <InventoryIcon /> },
    { title: "Your Orders", path: "/main_home/orders", icon: <ShoppingCartIcon /> },
    { title: "Favorite Items", path: "/main_home/fav", icon: <FavoriteIcon /> },
    { title: "Your Suggestions", path: "/main_home/suggestions", icon: <LightbulbIcon /> }
  ];

  // Toggle drawer for mobile
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  if (!isTokenPresent) {
    return (
      <Alert severity="error" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          You can't access this page without registering or logging in
        </Typography>
        <Button
          component={Link}
          to="/register"
          color="primary"
          variant="text"
          sx={{ textDecoration: 'underline', mx: 1 }}
        >
          Register
        </Button>
        <Button
          component={Link}
          to="/login"
          color="primary"
          variant="text"
          sx={{ textDecoration: 'underline', mx: 1 }}
        >
          Log In
        </Button>
      </Alert>
    );
  }

  if (!isValid) {
    return (
      <Alert severity="warning" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Your session has expired.
        </Typography>
        <Button
          component={Link}
          to="/login"
          color="primary"
          variant="text"
          sx={{ textDecoration: 'underline' }}
        >
          Log In
        </Button>
        <Typography variant="body1" sx={{ ml: 1 }}>
          again to continue.
        </Typography>
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ position: 'relative', mb: 4 }}>
        {/* Desktop Navigation Menu */}
        <Paper
          elevation={3}
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            gap: 2,
            p: 2,
            mt: 2,
            bgcolor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {navigationLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              variant="contained"
              color="success"
              startIcon={link.icon}
              sx={{
                fontWeight: 'bold',
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                boxShadow: 1
              }}
            >
              {link.title}
            </Button>
          ))}
        </Paper>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
          <IconButton
            color="success"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              '&:hover': { bgcolor: 'success.dark' },
              borderRadius: 2
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Drawer Menu - Now opening from left side */}
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: '75%',
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              p: 2
            }
          }}
        >
          <List>
            {navigationLinks.map((link) => (
              <ListItem key={link.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    bgcolor: 'success.main',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'success.dark' }
                  }}
                >
                  {link.icon}
                  <ListItemText primary={link.title} sx={{ ml: 2 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      {/* Content Area */}
      <Outlet />
    </Container>
  );
};

export default Home_main;
