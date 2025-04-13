import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function UserNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { label: "Book Ride", path: "/user/bookride" },
    { label: "My Bookings", path: "/user/history" },
    { label: "Profile", path: "/user/profile" },
    { label: "Logout", action: logout }
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderMenuItems = () =>
    menuItems.map((item, index) => (
      <ListItem
        button
        key={index}
        onClick={() => {
          if (item.path) navigate(item.path);
          if (item.action) item.action();
          setDrawerOpen(false);
        }}
      >
        <ListItemText primary={item.label} />
      </ListItem>
    ));

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ff6600" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bike Buddies
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>{renderMenuItems()}</List>
                <Divider />
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/user/bookride")}>
              Book Ride
            </Button>
            <Button color="inherit" onClick={() => navigate("/user/history")}>
              My Bookings
            </Button>
            <Button color="inherit" onClick={() => navigate("/user/profile")}>
              Profile
            </Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
