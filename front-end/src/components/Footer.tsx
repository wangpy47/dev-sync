import { Box, Container } from "@mui/material";

const Footer = () => {
  return (
    <Container
      disableGutters
      maxWidth={false} // 가로 폭 제한 제거
    >
      <Box
        sx={{
          height: 80,
          color: "#5a5a5a",
          margin: 0,
          padding: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          fontSize: "12px",
        }}
      >
        2024 DevSync, Create developer resumes effortlessly with AI.
      </Box>
    </Container>
  );
};
export default Footer;
