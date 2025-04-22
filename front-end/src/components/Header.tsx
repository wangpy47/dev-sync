/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { Link, useNavigate } from "react-router-dom";
import { openLoginForm } from "../redux/redux";
import logo from "../assets/logo.png";

const containerStyle = css`
  max-width: 1600px; /* main과 동일하게 설정 */
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem; // 좁은 화면 대응
  box-sizing: border-box;
`;
const Header = () => {
  const isLogin = useSelector((state: any) => state.login.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLogin = () => {
    dispatch(openLoginForm());
  };

  const handleNavigate = (path: string) => {
    if (!isLogin) {
      dispatch(openLoginForm());
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          boxShadow: "none",
          color: "black",
          top: 0,
          zIndex: 1000,
          borderBottom: 1,
          borderColor: "#d2d1d1",
          height: "70px",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "70px",
            px: 2,
            display: "flex",
            alignItems: "center",
            position: "relative", // 로고를 중앙 정렬하기 위한 기준
          }}
        >
          <div css={containerStyle}>
            {/* 모바일용 햄버거 메뉴 (왼쪽) */}
            <Box sx={{ display: { xs: "flex", md: "none" }, zIndex: 2 }}>
              <IconButton onClick={handleMenuClick}>
                <MenuIcon sx={{ color: "#3369c7" }} />
              </IconButton>
            </Box>

            {/* 로고 */}
            <Box
              sx={{
                position: { xs: "absolute", md: "static" },
                left: { xs: "50%", md: "auto" },
                transform: { xs: "translateX(-50%)", md: "none" },
                zIndex: 1,
              }}
            >
              <img
                src={logo}
                alt="로고"
                css={css`
                  height: 70px;
                  cursor: pointer;
                `}
                onClick={() => navigate("/")}
              />
            </Box>

            {/* PC 메뉴 (중앙) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                ml: 3,
              }}
            >
              <Button
                onClick={() => handleNavigate("/resume")}
                sx={{ color: "#3369c7", fontSize: "1.1rem" }}
              >
                이력서
              </Button>
              <Button
                onClick={() => navigate("/inquiry")}
                sx={{ color: "#3369c7", fontSize: "1.1rem" }}
              >
                문의
              </Button>
              <Button
                onClick={() => navigate("/community/general")}
                sx={{ color: "#3369c7", fontSize: "1.1rem" }}
              >
                커뮤니티
              </Button>
            </Box>

            {/* 로그인 or 프로필 (오른쪽) */}
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
              {!isLogin ? (
                <Button variant="contained" onClick={handleOpenLogin}>
                  로그인
                </Button>
              ) : (
                <ProfileButton />
              )}
            </Box>
          </div>
        </Toolbar>

        {/* 모바일용 메뉴 드롭다운 */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            onClick={() => {
              handleNavigate("/resume");
              handleMenuClose();
            }}
          >
            이력서
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/inquiry");
              handleMenuClose();
            }}
          >
            문의
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/community/general");
              handleMenuClose();
            }}
          >
            커뮤니티
          </MenuItem>
        </Menu>
      </AppBar>
      {/* 로그인 모달 */}
      <LoginForm />
    </>
  );
};

export default Header;
