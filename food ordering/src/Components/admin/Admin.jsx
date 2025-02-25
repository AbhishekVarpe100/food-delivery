import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Admin() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const menuItems = [
    { label: "Available Items", path: "/admin" },
    { label: "Add Item", path: "/admin/add_item" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Cart", path: "/admin/cart", color: "#2ECC71" },
    { label: "Customer Suggestions", path: "/admin/suggestions", color: "#2ECC71" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#F9FAFB" }}>
      {/* App Bar for Mobile */}
      {isMobile && (
        <AppBar position="sticky" sx={{ bgcolor: "white", boxShadow: 3 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "#2C3E50", fontWeight: "bold" }}>
              Admin Dashboard
            </Typography>
            <IconButton edge="end" onClick={toggleDrawer}>
              <MenuIcon sx={{ color: "#2C3E50" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer for Mobile */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 260, bgcolor: "#2C3E50", color: "white", height: "100vh" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Desktop Navigation */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            p: 2,
            bgcolor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            mx: "auto",
            width: "80%",
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: "8px",
                backgroundColor: item.color || "#1F78D1",
                color: "white",
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: item.color ? "#27AE60" : "#0E5CA8",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Admin;
