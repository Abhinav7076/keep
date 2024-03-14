import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';  
import AddIcon from '@mui/icons-material/Add';

const Navbar = ({ onMenuSelect, onMenu2Select, onSearch }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu2, setAnchorElMenu2] = React.useState(null);
  const [heading, setHeading] = React.useState('Economics')
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu2 = (event) => {
    setAnchorElMenu2(event.currentTarget);
  };

  const handleMenuClick = (option) => {
    // Close the menu
    handleClose();
    // Call the function passed via props
    onMenuSelect(option);
    onMenu2Select('All');
    onSearch('');
    setHeading(option)
  };

  const handleMenu2Click = (option) => {
    // Close the menu
    handleMenu2Close();
    // Call the function passed via props
    onMenu2Select(option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu2Close = (option) => {
    setAnchorElMenu2(null);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    // Pass the search input value to the App component
    onSearch(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick('Economics')}>Economics</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Geography')}>Geography</MenuItem>
          <MenuItem onClick={() => handleMenuClick('Polity')}>Polity</MenuItem>
        </Menu>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu2}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu2"
          anchorEl={anchorElMenu2}
          keepMounted
          open={Boolean(anchorElMenu2)}
          onClose={() => handleMenu2Close('')}>
          <MenuItem onClick={() => handleMenu2Click('All')}>All</MenuItem>
          <MenuItem onClick={() => handleMenu2Click('A')}>A</MenuItem>
          <MenuItem onClick={() => handleMenu2Click('B')}>B</MenuItem>
          <MenuItem onClick={() => handleMenu2Click('C')}>C</MenuItem>
        </Menu>
        <Typography component={RouterLink} to="/" color="inherit" variant="h6" sx={{ flexGrow: 1 }} style={{textDecoration: 'none'}}>
          {heading}
        </Typography>
        <RouterLink to="/create" style={{ color: 'inherit', textDecoration: 'none' }}>
          <AddIcon />
        </RouterLink>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchChange}
            sx={{ ml: 1, flex: 1, color: 'white' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
