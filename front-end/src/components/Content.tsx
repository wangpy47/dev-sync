import { Box, Container } from "@mui/material";

const Content = () => {
  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Box
          sx={{
            height: "auto",
            bgcolor: "#ffffff",
            p: 2,
            padding: 0,
            // border: "5px solid blue",
            minHeight: "500px",
          }}
        >
          <Box sx={{ minHeight: "300px", backgroundColor: "#f6f6f6" }}></Box>
        </Box>
      </Container>
    </>
  );
};
export default Content;
