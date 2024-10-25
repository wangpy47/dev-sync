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
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
// import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {
  const [clickLoginForm, setClickLoginForm] = useState(false);
  const isLogin = useSelector((state: any) => state.login.loggedIn);

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
          <h3 style={{ padding: "0 0.8rem 0.3rem 0" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#2361cb",
                fontWeight: "bold",
              }}
            >
              DevSync
            </Link>
          </h3>
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
          {/* <TestButton /> */}
          {/* <LogoutButton /> */}

          <Box>
            {!isLogin ? (
              <Button
                variant="contained"
                size="small"
                onClick={handleOpenLogin}
              >
                login
              </Button>
            ) : (
              <ProfileButton />
            )}
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
