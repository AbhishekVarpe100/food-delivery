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
  ListItemIcon,
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import ListAltIcon from "@mui/icons-material/ListAlt";

function Admin() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const menuItems = [
    { label: "Available Items", path: "/admin", icon: <DashboardIcon /> },
    { label: "Add Item", path: "/admin/add_item", icon: <AddIcon /> },
    { label: "Orders", path: "/admin/orders", icon: <ListAltIcon /> },
    { label: "Cart", path: "/admin/cart", icon: <ShoppingCartIcon />, color: "#2ECC71" },
    { label: "Customer Suggestions", path: "/admin/suggestions", icon: <CommentIcon />, color: "#2ECC71" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F9FAFB" }}>
      {/* Sidebar for both Mobile and Desktop */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isDrawerOpen || !isMobile}
        onClose={toggleDrawer}
        sx={{ width: 260, flexShrink: 0 }}
        PaperProps={{
          sx: {
            width: 260,
            bgcolor: "#2C3E50",
            color: "white",
            position: "relative",
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ width: 260, bgcolor: "#2C3E50", color: "white", height: "100vh" }}>
          {isMobile && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* App Bar for Mobile */}
        {isMobile && (
          <AppBar position="sticky" sx={{ bgcolor: "white", boxShadow: 3, zIndex: 2 }}>
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

        {/* Main Content */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default Admin;
