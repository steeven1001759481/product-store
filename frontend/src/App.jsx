import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Box, Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import CreatePage from './pages/createpage';
import Navbar from './components/navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />}/>
        </Routes>
      </Box>
    </>
  )
}

export default App
