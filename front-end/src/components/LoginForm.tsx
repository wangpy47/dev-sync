import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

interface LoginFormProps {
  setClickLoginForm: Dispatch<SetStateAction<boolean>>;
  clickLoginForm: boolean;
}

const LoginForm = ({ setClickLoginForm, clickLoginForm }: LoginFormProps) => {
  const handleGoogleLogin = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    fetch("http://localhost:3000/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => console.log(res))
      .then((data) => {
        console.log("Google login successful:", data);
      })
      .catch((error) => {
        console.error("Google login failed:", error);
      });
  };

  const handleClose = () => {
    setClickLoginForm(false);
  };

  return (
    <>
      <GoogleOAuthProvider clientId="494777037349-klcrqhh6nuko5a7tl5uneq56517bpcuf.apps.googleusercontent.com">
        <Dialog open={clickLoginForm} onClose={handleClose}>
          <DialogTitle
            sx={{
              fontWeight: "bold",
              color: "#3369c7",
              m: 0,
              pr: 15,
              pl: 15,
              pt: 3,
              pb: 3,
            }}
          >
            Login
          </DialogTitle>
          <IconButton
            size="small"
            disableRipple
            aria-label="close"
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              "&:focus": { outline: "none" },
              color: "#767676",
            }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          {/* <Button variant="contained" sx={{ ml: 2, mr: 2, mt: 2, mb: 1 }}>
          Continue with Google
        </Button> */}
          <GoogleLogin onSuccess={handleGoogleLogin} />
          <Button variant="contained" sx={{ ml: 2, mr: 2, mt: 1, mb: 3 }}>
            Continue with Kakao
          </Button>
        </Dialog>
      </GoogleOAuthProvider>
    </>
  );
};

export default LoginForm;
