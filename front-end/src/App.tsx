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
      .then((response) => response.text())
      .then((data) => {
        if (data === 'Not authenticated') {
          console.log(data)
        } else {
          // 유저가 여전히 로그인된 상태
          fetch(`http://localhost:3000/user/getUser`, {
            credentials: 'include',  // 세션 쿠키를 포함
          })
            .then((response) => response.json())
            .then((userInfo) => {
              console.log(userInfo);  // 유저 정보 출력
            })
            .catch((error) => console.error('Error:', error));
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
