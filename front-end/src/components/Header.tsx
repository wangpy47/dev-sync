import {
  AppBar,
  Box,
  Button,
  // IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LoginForm from "./LoginForm";
import LogoutButton from "./logoutButton";
import TestButton from "./TestButton";
// import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {
  const [clickLoginForm, setClickLoginForm] = useState(false);

  const handleOpenLogin = () => {
    setClickLoginForm(true);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)", // 흰색 반투명 배경
          backdropFilter: "blur(5px)", // 블러 효과 추가
          boxShadow: "none", // 그림자 제거
          color: "black", // 텍스트 색상 변경
          top: 0, // 화면 최상단에 고정
          zIndex: 500,
          border: 1,
          borderColor: "#d2d1d1",
          overFlowX: "auto",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontWeight: "bold",
              color: "#2361cb",
              textDecoration: "none",
            }}
          >
            DevSync
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 0, color: "#3369c7", display: "block" }}>
              이력서
            </Button>
            <Button sx={{ my: 0, color: "#3369c7", display: "block" }}>
              문의하기
            </Button>
            <Button sx={{ my: 0, color: "#3369c7", display: "block" }}>
              커뮤니티
            </Button>
          </Box>
          {/* 테스트버튼 */}
          <TestButton />
          <LogoutButton />

          <Box>
            <Button variant="contained" size="small" onClick={handleOpenLogin}>
              login
            </Button>
            {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            edge="end"
          >
            <AccountCircle />
          </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
      <LoginForm
        clickLoginForm={clickLoginForm}
        setClickLoginForm={setClickLoginForm}
      />
    </>
  );
};
export default Header;
