import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';



export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  
  // Set the correct value based on current location
  useEffect(() => {
    if (location.pathname === '/') {
      setValue(0);
    } else if (location.pathname === '/movies') {
      setValue(1);
    } else if (location.pathname === '/series') {
      setValue(2);
    } else if (location.pathname === '/search') {
      setValue(3);
    }
  }, [location.pathname]);
  
  // Handle navigation when value changes
  useEffect(() => {
    if(value === 0) {
      navigate('/');
    } else if(value === 1) {
      navigate('/movies');
      
    } else if(value === 2) {
      navigate('/series');
    } else if(value === 3) {    
      navigate('/search');
    }
  }, [value, navigate]);


  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          backgroundColor: '#2d313a !important',
          zIndex: 100,
          '& .MuiBottomNavigationAction-root': {
            color: 'white',
          },
          '& .MuiBottomNavigationAction-root.Mui-selected': {
            color: 'white',
          },
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={() => window.scroll(0, 0)} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction onClick={() => window.scroll(0, 0)} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction onClick={() => window.scroll(0, 0)} label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction onClick={() => window.scroll(0, 0)} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}