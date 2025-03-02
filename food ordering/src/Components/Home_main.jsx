import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import InventoryIcon from "@mui/icons-material/Inventory";

const HomeMain = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isValid, setIsValid] = useState(true);
  const [isTokenPresent, setIsTokenPresent] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const checkUserValid = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gethome", { params: { token } });
      if (res.data.msg === "token not present") {
        setIsTokenPresent(false);
      } else if (res.data.msg === "invalid token") {
        setIsValid(false);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  if (!isTokenPresent || !isValid) {
    return (
      <Box className="w-screen h-screen flex justify-center items-center p-4">
        <Typography variant="h6" color="error">
          {isTokenPresent ? "Your session has expired. Please log in again." : "You can't access this page without logging in."}
        </Typography>
        <Button component={Link} to="/login" color="primary" variant="contained" className="ml-4">
          Log In
        </Button>
      </Box>
    );
  }

  return (
    <Box className="w-screen min-h-screen flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <Box className="flex md:hidden p-4 bg-white">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Sidebar */}
      <Box className="hidden md:flex flex-col w-1/6 min-h-screen bg-gray-700 text-gray-200 p-4">
        <Typography variant="h6" className="mb-4 font-bold text-gray-200">Menu</Typography>
        <List>
          {navigationLinks.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                className="text-gray-200 hover:bg-gray-800 transition-all duration-300 ease-in-out"
              >
                {link.icon}
                <ListItemText primary={link.title} className="ml-2" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ className: "bg-gray-900 text-gray-200 w-3/4" }}
      >
        <Box className="min-h-full flex flex-col p-4">
          <Box className="flex justify-end mb-4">
            <IconButton color="inherit" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navigationLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={toggleDrawer(false)}
                  className="text-gray-200 hover:bg-gray-800 transition-all duration-300 ease-in-out"
                >
                  {link.icon}
                  <ListItemText primary={link.title} className="ml-2" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box className="flex-1 p-4 md:p-0 md:py-8 md:pr-8">
  <Outlet />
</Box>
    </Box>
  );
};

export default HomeMain;
