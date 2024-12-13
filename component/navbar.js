import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleLinkClick = (route, e) => {
    router.push(route);
    setDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleHistoryClick = () => {
    if (user?.email) {
      router.push('/history');
    } else {
      router.push('/login?redirectTo=/history');
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Book Management System
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', flexGrow: 1 }}>
            <Button color="inherit" onClick={(e) => handleLinkClick('/book', e)}>Book</Button>
            <Button color="inherit" onClick={(e) => handleLinkClick('/author', e)}>Author</Button>
            <Button color="inherit" onClick={(e) => handleLinkClick('/genre', e)}>Genre</Button>
            <Button color="inherit" onClick={handleHistoryClick}>History</Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user?.email ? (
              <>
                <Typography variant="body1" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                  {user.email}
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout} size="small">
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="contained" color="secondary" onClick={(e) => router.push('/login')} size="small">
                Login
              </Button>
            )}
          </Box>

          <IconButton
            color="inherit"
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItem button onClick={(e) => handleLinkClick('/book', e)}>
            <ListItemText primary="Book" />
          </ListItem>
          <ListItem button onClick={(e) => handleLinkClick('/author', e)}>
            <ListItemText primary="Author" />
          </ListItem>
          <ListItem button onClick={(e) => handleLinkClick('/genre', e)}>
            <ListItemText primary="Genre" />
          </ListItem>
          <ListItem button onClick={handleHistoryClick}>
            <ListItemText primary="History" />
          </ListItem>
          {user?.email && (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
          {!user?.email && (
            <ListItem button onClick={(e) => handleLinkClick('/login', e)}>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
