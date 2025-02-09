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
// import LogoutButton from "./logoutButton";
// import TestButton from "./TestButton";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { Link, useNavigate } from "react-router-dom";
import { openLoginForm } from "../redux/redux";

const Header = () => {
  const isLogin = useSelector((state: any) => state.login.loggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenLogin = () => {
    dispatch(openLoginForm());
  };

  // 버튼 클릭 시 로그인 여부 체크 후 동작 처리
  const handleNavigate = (path: string) => {
    if (!isLogin) {
      dispatch(openLoginForm()); // 로그인되지 않았다면 로그인 폼 열기
    } else {
      navigate(path); // 로그인 상태면 해당 경로로 이동
    }
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
          zIndex: 1000,
          position: "fixed",
          width: "100%",
          border: 1,
          borderColor: "#d2d1d1",
          overFlowX: "auto",
          height: "70px",
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
            <Button
              onClick={() => handleNavigate("/resume")}
              sx={{ my: 0, color: "#3369c7", display: "block" }}
            >
              이력서
            </Button>
            <Button
              sx={{ my: 0, color: "#3369c7", display: "block" }}
              onClick={() => navigate("/inquiry")}
            >
              문의
            </Button>
            <Button
              onClick={() => handleNavigate("/community/general")}
              sx={{ my: 0, color: "#3369c7", display: "block" }}
            >
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
      // clickLoginForm={clickLoginForm}
      // setClickLoginForm={setClickLoginForm}
      />
    </>
  );
};
export default Header;
