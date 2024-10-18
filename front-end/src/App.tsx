import Header from "./components/Header";
import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { Box, useAutocomplete } from "@mui/material";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/auth/status', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Not authenticated') {
          console.log(data.message)
        } else {
          // 유저가 여전히 로그인된 상태
          console.log('Already logged in');
        }
      });
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Content />
        <Footer />
      </Box>
    </>
  );
}

export default App;
