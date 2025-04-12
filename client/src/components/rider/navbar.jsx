import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const menuItems = [
    { label: "Home", path: "/rider" },
    { label: "Vehicle", path: "/rider/viewvehicle" },
    {
      label: "Rides",
      subItems: [
        { label: "View Booking", path: "/rider/viewbooking" },
        { label: "Completed Rides", path: "/rider/completedrides" },
      ]
    },
    { label: "Rating", path: "/rider/viewrating" },
    { label: "Profile", path: "/rider/profile" },
    {
      label: "Logout",
      action: () => {
        navigate("/");
        localStorage.clear();
      }
    },
  ];

  const renderMenuItems = () =>
    menuItems.map((item, index) => {
      if (item.subItems) {
        return (
          <Box key={index}>
            <ListItem button onClick={handleClick}>
              <ListItemText primary={item.label} />
            </ListItem>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {item.subItems.map((sub, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleClose();
                    navigate(sub.path);
                  }}
                >
                  {sub.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        );
      } else {
        return (
          <ListItem
            button
            key={index}
            onClick={() => {
              handleClose();
              if (item.path) navigate(item.path);
              if (item.action) item.action();
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        );
      }
    });

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
            <Button color="inherit" onClick={() => navigate('/rider')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/rider/viewvehicle')}>Vehicle</Button>
            <Button color="inherit" onClick={handleClick}>Rides</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { handleClose(); navigate('/rider/viewbooking'); }}>View Booking</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/rider/completedrides'); }}>Completed Rides</MenuItem>
            </Menu>
            <Button color="inherit" onClick={() => { handleClose(); navigate('/rider/viewrating'); }}>Rating</Button>
            <Button color="inherit" onClick={() => navigate('/rider/profile')}>Profile</Button>
            <Button color="inherit" onClick={() => {
              navigate('/');
              localStorage.clear();
            }}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
