import React from 'react';
import { Drawer, Box, Typography, Divider, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

 const Sidenav = ({ open, onClose }) => {
  return (
    <Drawer
      sx={{        
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}      
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 240, padding: '16px', color:'black'}}>
        <Typography variant="h6" gutterBottom>
            Menu
        </Typography>
        <Divider />
        {/* <MenuItem></MenuItem> */}
      </Box>
    </Drawer>
  );
};
export default Sidenav;
