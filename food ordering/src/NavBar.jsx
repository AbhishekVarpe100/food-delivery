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

function NavBar() {
  const [username, setUser] = useState(localStorage.getItem("username"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCountTotal, setCount] = useState(0);
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
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsMenuOpen(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'gray', boxShadow: 3 }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            FoodOrdering<span style={{ color: '#66bb6a' }}>Platform</span>.com
          </Typography>

          {/* Hamburger Menu for Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
              Home
            </Button>

            {username ? (
              <>
                <Button color="inherit" onClick={handleLogOut} startIcon={<ExitToAppIcon />} sx={{ mr: 2 }}>
                  Log out
                </Button>
                <IconButton color="inherit" component={Link} to="/cart" sx={{ mr: 2 }}>
                  <Badge badgeContent={cartCountTotal} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  <div>
                    <Typography variant="body1">{username}</Typography>
                    <Typography variant="body2">
                      {localStorage.getItem("email")}
                    </Typography>
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: '50%' } // Set width to 50% of the viewport
        }}
      >
        <Box sx={{ width: '100%', padding: 2 }} role="presentation">
          <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            {username ? (
              <>
                <ListItem button onClick={handleLogOut}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItem>
                <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Cart (${cartCountTotal} ${cartCountTotal==1?'Item':'Items'})`} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={username}
                    secondary={localStorage.getItem("email")}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{ color: 'textSecondary' }}
                  />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/register" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
          <IconButton onClick={toggleDrawer(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}

export default NavBar;
