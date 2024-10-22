import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { logoutUser } from "../api/auth";

const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
    console.log(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const isLogout = await logoutUser();
    if (isLogout) {
      window.location.href = "/login"; // 로그아웃 후 리디렉션
    }
  };

  return (
    <>
      <Avatar onClick={handleAvatarClick} />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            // 그림자 0
            elevation: 0,
            sx: {
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
            },
          },
        }}
      >
        <MenuItem>내 정보</MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </>
  );
};
export default ProfileButton;
