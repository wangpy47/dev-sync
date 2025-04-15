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
        <Toolbar sx={{ minHeight: "70px", px: 2 }}>
          {/* 모바일: 햄버거 메뉴 */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton onClick={handleMenuClick}>
              <MenuIcon sx={{ color: "#3369c7" }} />
            </IconButton>
          </Box>

          {/* 로고 - 모바일은 중앙, PC는 왼쪽 */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              position: { xs: "absolute", md: "static" },
              left: { xs: "50%", md: "auto" },
              transform: { xs: "translateX(-50%)", md: "none" },
              textDecoration: "none",
              color: "#2361cb",
              fontWeight: "bold",
              mx: { xs: 0, md: 2 },
            }}
          >
            DevSync
          </Typography>

          {/* PC: 메뉴 버튼 */}
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <Button
              onClick={() => handleNavigate("/resume")}
              sx={{ color: "#3369c7" }}
            >
              이력서
            </Button>
            <Button
              onClick={() => navigate("/inquiry")}
              sx={{ color: "#3369c7" }}
            >
              문의
            </Button>
            <Button
              onClick={() => navigate("/community/general")}
              sx={{ color: "#3369c7" }}
            >
              커뮤니티
            </Button>
          </Box>

          {/* 우측: 로그인 or 프로필 */}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
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
