import './App.scss';
import Film from './components/Film';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Detail from './components/Detail';
import News from './components/News';
import React, { useContext } from 'react';
import { ThemeContext } from './components/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import { Box, FormControlLabel, Switch } from '@mui/material';
import Profile from './components/Profile';

function App() {
  const { theme, toggle, dark } = useContext(ThemeContext)
  return (
    <Box className='App' sx={{ backgroundColor: theme.backgroundColor }}>
      <ScrollToTop />
      <Navigation />
      <Box sx={{ marginLeft: '10rem' }}>
        <FormControlLabel className={dark ? 'darkTheme' : 'whiteTheme'} control={
          <Switch checked={dark} onChange={toggle} inputProps={{ 'aria-label': 'controlled' }} />
        } label="Dark Mode" />
      </Box>
      <Routes>
        <Route path='/' element={<Film />} />
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/setting' element={<Profile />}></Route>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
